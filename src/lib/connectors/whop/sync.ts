/**
 * DRAWDOWN OS — WHOP SYNCHRONISATION SERVICE (SERVER-ONLY)
 * 
 * Orchestrates live read-only ingestion, normalization, Supabase upserts,
 * and audit logging for Whop marketplace activity.
 */

import { checkWhopHealth, getWhopProducts, getWhopPayments } from './client';
import { supabaseServer } from '@/lib/supabase/server';

export interface WhopSyncResult {
  startedAt: string;
  completedAt: string;
  durationMs: number;
  health: Awaited<ReturnType<typeof checkWhopHealth>>;
  productsRetrieved: number;
  productsSaved: number;
  paymentsRetrieved: number;
  paymentsSaved: number;
  errors: string[];
  finalState: 'SUCCESS' | 'PARTIAL' | 'FAILED';
}

export async function runWhopSync(): Promise<WhopSyncResult> {
  const startedAt = new Date().toISOString();
  const startTimeMs = Date.now();
  const errors: string[] = [];

  // 1. Authenticate & Check Health
  const health = await checkWhopHealth();

  if (!health.connected) {
    const durationMs = Date.now() - startTimeMs;
    const completedAt = new Date().toISOString();
    
    // Log audit event for failed sync
    await supabaseServer.from('audit_logs').insert({
      connector_id: 'whop',
      operation: 'SYNC_RUN',
      actor: 'SYSTEM',
      started_at: startedAt,
      completed_at: completedAt,
      duration_ms: durationMs,
      status: 'FAILURE',
      records_affected: 0,
      error_category: health.status,
      error_message: health.message || 'Whop connection health check failed.',
    });

    return {
      startedAt,
      completedAt,
      durationMs,
      health,
      productsRetrieved: 0,
      productsSaved: 0,
      paymentsRetrieved: 0,
      paymentsSaved: 0,
      errors: [health.message || 'Connection health check failed.'],
      finalState: 'FAILED',
    };
  }

  // Update canonical marketplace account record in Supabase
  await supabaseServer.from('canonical_marketplace_accounts').upsert({
    connector_id: 'whop',
    external_account_id: health.accountId,
    account_name: health.accountName || 'Whop Storefront',
    configured_state: 'CONFIGURED_UNVERIFIED',
    connection_state: 'CONNECTED',
    last_successful_auth_at: health.checkedAt,
    last_successful_sync_at: new Date().toISOString(),
    last_attempted_sync_at: startedAt,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'connector_id,external_account_id' });

  // 2. Retrieve Live Products
  const productsRes = await getWhopProducts();
  let productsSaved = 0;
  if (productsRes.success && productsRes.products.length > 0) {
    for (const p of productsRes.products) {
      const { error } = await supabaseServer.from('whop_products').upsert({
        whop_product_id: p.id,
        whop_company_id: p.companyId,
        title: p.title,
        headline: p.headline,
        route: p.route,
        visibility: p.visibility,
        member_count: p.memberCount,
        raw_snapshot: p.raw,
        synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'whop_product_id' });

      if (error) {
        errors.push(`Product ${p.id} upsert error: ${error.message}`);
      } else {
        productsSaved++;
      }
    }
  } else if (productsRes.error) {
    errors.push(`Products fetch error: ${productsRes.error}`);
  }

  // 3. Retrieve Live Payments
  const paymentsRes = await getWhopPayments();
  let paymentsSaved = 0;
  if (paymentsRes.success && paymentsRes.payments.length > 0) {
    for (const pay of paymentsRes.payments) {
      const { error } = await supabaseServer.from('whop_payments').upsert({
        whop_payment_id: pay.id,
        whop_company_id: pay.companyId,
        whop_product_id: pay.productId,
        whop_plan_id: pay.planId,
        status: pay.status,
        gross_amount: pay.grossAmount,
        currency: pay.currency,
        net_amount: pay.netAmount,
        fee_amount: pay.feeAmount,
        tax_amount: pay.taxAmount,
        billing_reason: pay.billingReason,
        refunded: pay.refunded,
        customer_reference: pay.customerReference,
        created_at_timestamp: pay.createdAtTimestamp,
        synced_at: new Date().toISOString(),
      }, { onConflict: 'whop_payment_id' });

      if (error) {
        errors.push(`Payment ${pay.id} upsert error: ${error.message}`);
      } else {
        paymentsSaved++;
      }
    }
  } else if (paymentsRes.error) {
    errors.push(`Payments fetch error: ${paymentsRes.error}`);
  }

  const durationMs = Date.now() - startTimeMs;
  const completedAt = new Date().toISOString();
  const finalState = errors.length === 0 ? 'SUCCESS' : (productsSaved > 0 || paymentsSaved > 0 ? 'PARTIAL' : 'FAILED');

  // Record audit log
  await supabaseServer.from('audit_logs').insert({
    connector_id: 'whop',
    operation: 'SYNC_RUN',
    actor: 'SYSTEM',
    started_at: startedAt,
    completed_at: completedAt,
    duration_ms: durationMs,
    status: finalState === 'SUCCESS' ? 'SUCCESS' : 'FAILURE',
    records_affected: productsSaved + paymentsSaved,
    error_message: errors.length > 0 ? errors.join('; ') : undefined,
    metadata: {
      productsRetrieved: productsRes.products.length,
      productsSaved,
      paymentsRetrieved: paymentsRes.payments.length,
      paymentsSaved,
    },
  });

  return {
    startedAt,
    completedAt,
    durationMs,
    health,
    productsRetrieved: productsRes.products.length,
    productsSaved,
    paymentsRetrieved: paymentsRes.payments.length,
    paymentsSaved,
    errors,
    finalState,
  };
}
