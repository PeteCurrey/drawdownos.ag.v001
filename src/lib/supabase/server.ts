/**
 * DRAWDOWN OS — SERVER SUPABASE CLIENT (SERVER-ONLY)
 * 
 * Privileged database client for marketplace ingestion, audit logging,
 * and system of record management. Never expose to client-side bundles.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NODE_ENV === 'production') {
  console.warn('[SECURITY WARNING] SUPABASE_SERVICE_ROLE_KEY is not defined. Server database writes may fail or use anon privileges.');
}

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
