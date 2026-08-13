import { NextResponse } from 'next/server';

/**
 * DRAWDOWN OS — DIGISTORE24 LIVE PRODUCTS
 * Fetches real products from the Digistore24 API.
 * No mock data. No fabricated entries.
 */
export async function GET() {
  const apiKey = process.env.DIGISTORE24_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: 'DIGISTORE24_API_KEY is not set in environment variables.',
      products: [],
    }, { status: 200 });
  }

  try {
    const res = await fetch('https://www.digistore24.com/api/call/listProducts/', {
      method: 'GET',
      headers: {
        'X-DS-API-KEY': apiKey,
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({
        success: false,
        error: `Digistore24 API error: HTTP ${res.status}`,
        products: [],
      }, { status: 200 });
    }

    const data = await res.json();

    if (data.result === 'error') {
      return NextResponse.json({
        success: false,
        error: data.message || 'Digistore24 API error.',
        products: [],
      }, { status: 200 });
    }

    const rawProducts: Record<string, unknown>[] = data?.data?.products ?? [];

    const products = rawProducts.map((p) => ({
      id: p.id as string,
      name: (p.name_intern as string) || (p.name as string) || 'Unnamed Product',
      title: (p.name as string) || '',
      currency: p.currency as string,
      isActive: p.is_active === 'Y',
      productType: p.product_type_name as string,
      checkoutUrl: p.orderform_customer_url as string,
      affiliateCommissionPct: p.affiliate_commission as string,
      createdAt: p.created_at as string,
      approvalStatus: Array.isArray(p.approval_status_list)
        ? (p.approval_status_list as Array<{ reseller_name: string; approval_status: string }>)
        : [],
    }));

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    }, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error fetching Digistore24 products.',
      products: [],
    }, { status: 200 });
  }
}
