import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET() {
  try {
    // Publications count
    const { count: publicationsCount } = await supabaseServer
      .from('publications')
      .select('*', { count: 'exact', head: true });

    // Active listings count
    const { count: activeListingsCount } = await supabaseServer
      .from('publication_listings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'LISTED');

    // Total marketplaces in registry
    const { count: totalMarketplaces } = await supabaseServer
      .from('marketplaces')
      .select('*', { count: 'exact', head: true })
      .eq('active', true);

    // Marketplaces with active connection/manual management
    const { count: activeChannels } = await supabaseServer
      .from('marketplace_accounts')
      .select('*', { count: 'exact', head: true })
      .in('connection_status', ['CONNECTED', 'MANUAL']);

    // Revenue MTD
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: transactions } = await supabaseServer
      .from('sales_transactions')
      .select('net_amount, currency')
      .eq('status', 'COMPLETED')
      .gte('transacted_at', startOfMonth.toISOString());

    const revenueMtd =
      transactions && transactions.length > 0
        ? transactions.reduce((sum, t) => sum + (t.net_amount ?? 0), 0)
        : null;

    // Needs attention items
    const attentionItems: Array<{ type: string; label: string; detail: string; action: string; href: string }> = [];

    // Publications with no master file
    const { data: pubsNoMaster } = await supabaseServer
      .from('publications')
      .select('id, title')
      .is('master_file_id', null)
      .limit(5);

    if (pubsNoMaster) {
      for (const pub of pubsNoMaster) {
        attentionItems.push({
          type: 'MISSING_PDF',
          label: pub.title,
          detail: 'Master PDF missing',
          action: 'UPLOAD',
          href: `/library/${pub.id}?tab=files`,
        });
      }
    }

    // Listings with LISTED status but no listing_url
    const { data: listingsNoUrl } = await supabaseServer
      .from('publication_listings')
      .select('id, publication_id, publications(title), marketplace_id, marketplaces(name)')
      .eq('status', 'LISTED')
      .is('listing_url', null)
      .limit(5);

    if (listingsNoUrl) {
      for (const listing of listingsNoUrl as any[]) {
        attentionItems.push({
          type: 'MISSING_URL',
          label: listing.publications?.title ?? 'Publication',
          detail: `${listing.marketplaces?.name ?? 'Marketplace'} — Listing URL missing`,
          action: 'UPDATE',
          href: `/distribution/${listing.marketplace_id}`,
        });
      }
    }

    // Distribution overview
    const { data: marketplaceAccounts } = await supabaseServer
      .from('marketplace_accounts')
      .select(`
        id,
        registered,
        management_method,
        connection_status,
        last_verified_at,
        marketplaces ( id, name, slug, region, priority, distribution_method, api_available )
      `)
      .limit(20);

    return NextResponse.json({
      publications: publicationsCount ?? 0,
      activeListings: activeListingsCount ?? 0,
      activeChannels: activeChannels ?? 0,
      totalMarketplaces: totalMarketplaces ?? 0,
      revenueMtd,
      revenueCurrency: 'GBP',
      attentionItems,
      marketplaceAccounts: marketplaceAccounts ?? [],
    });
  } catch (err) {
    console.error('[dashboard/summary]', err);
    return NextResponse.json(
      { error: 'Failed to load dashboard data.', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
