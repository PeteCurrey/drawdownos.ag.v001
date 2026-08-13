/**
 * DRAWDOWN OS — ENVIRONMENT & API CONNECTOR CONFIGURATION ENGINE
 * 
 * Provides type-safe access to environment variables and external marketplace key checks.
 */

export interface MarketplaceEnvConfig {
  whop: {
    apiKey: string | undefined;
    companyId: string | undefined;
    webhookSecret: string | undefined;
    isConfigured: boolean;
  };
  gumroad: {
    accessToken: string | undefined;
    appId: string | undefined;
    isConfigured: boolean;
  };
  etsy: {
    apiKey: string | undefined;
    sharedSecret: string | undefined;
    shopId: string | undefined;
    isConfigured: boolean;
  };
  payhip: {
    apiKey: string | undefined;
    sellerId: string | undefined;
    isConfigured: boolean;
  };
  amazon: {
    vendorId: string | undefined;
    adsClientId: string | undefined;
    isConfigured: boolean;
  };
  hotmart: {
    clientId: string | undefined;
    basicToken: string | undefined;
    isConfigured: boolean;
  };
  lemonSqueezy: {
    apiKey: string | undefined;
    storeId: string | undefined;
    isConfigured: boolean;
  };
  shopify: {
    domain: string | undefined;
    adminAccessToken: string | undefined;
    isConfigured: boolean;
  };
  publishDrive: {
    apiKey: string | undefined;
    accountId: string | undefined;
    isConfigured: boolean;
  };
  draft2Digital: {
    apiKey: string | undefined;
    isConfigured: boolean;
  };
}

export const env = {
  // Core App
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Database & Storage
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },

  // AI & Translation Services
  ai: {
    openaiKey: process.env.OPENAI_API_KEY,
    anthropicKey: process.env.ANTHROPIC_API_KEY,
    geminiKey: process.env.GEMINI_API_KEY,
    deeplKey: process.env.DEEPL_API_KEY,
  },

  // Whop API Specific Keys
  whop: {
    apiKey: process.env.WHOP_API_KEY,
    companyId: process.env.WHOP_COMPANY_ID,
    webhookSecret: process.env.WHOP_WEBHOOK_SECRET,
    isConfigured: Boolean(process.env.WHOP_API_KEY),
  },

  // Direct Marketplace APIs
  marketplaces: getMarketplaceConfigs(),
};

function getMarketplaceConfigs(): MarketplaceEnvConfig {
  return {
    whop: {
      apiKey: process.env.WHOP_API_KEY,
      companyId: process.env.WHOP_COMPANY_ID,
      webhookSecret: process.env.WHOP_WEBHOOK_SECRET,
      isConfigured: Boolean(process.env.WHOP_API_KEY),
    },
    gumroad: {
      accessToken: process.env.GUMROAD_ACCESS_TOKEN,
      appId: process.env.GUMROAD_APP_ID,
      isConfigured: Boolean(process.env.GUMROAD_ACCESS_TOKEN),
    },
    etsy: {
      apiKey: process.env.ETSY_API_KEY,
      sharedSecret: process.env.ETSY_SHARED_SECRET,
      shopId: process.env.ETSY_SHOP_ID,
      isConfigured: Boolean(process.env.ETSY_API_KEY && process.env.ETSY_SHOP_ID),
    },
    payhip: {
      apiKey: process.env.PAYHIP_API_KEY,
      sellerId: process.env.PAYHIP_SELLER_ID,
      isConfigured: Boolean(process.env.PAYHIP_API_KEY),
    },
    amazon: {
      vendorId: process.env.AMAZON_KDP_VENDOR_ID,
      adsClientId: process.env.AMAZON_ADS_CLIENT_ID,
      isConfigured: Boolean(process.env.AMAZON_KDP_VENDOR_ID || process.env.AMAZON_ADS_CLIENT_ID),
    },
    hotmart: {
      clientId: process.env.HOTMART_CLIENT_ID,
      basicToken: process.env.HOTMART_BASIC_TOKEN,
      isConfigured: Boolean(process.env.HOTMART_CLIENT_ID),
    },
    lemonSqueezy: {
      apiKey: process.env.LEMON_SQUEEZY_API_KEY,
      storeId: process.env.LEMON_SQUEEZY_STORE_ID,
      isConfigured: Boolean(process.env.LEMON_SQUEEZY_API_KEY),
    },
    shopify: {
      domain: process.env.SHOPIFY_STORE_DOMAIN,
      adminAccessToken: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      isConfigured: Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN),
    },
    publishDrive: {
      apiKey: process.env.PUBLISHDRIVE_API_KEY,
      accountId: process.env.PUBLISHDRIVE_ACCOUNT_ID,
      isConfigured: Boolean(process.env.PUBLISHDRIVE_API_KEY),
    },
    draft2Digital: {
      apiKey: process.env.DRAFT2DIGITAL_API_KEY,
      isConfigured: Boolean(process.env.DRAFT2DIGITAL_API_KEY),
    },
  };
}

/**
 * Returns configuration status summary for UI / System Health Checks
 */
export function checkMarketplaceConnectionStatus(marketplaceId: string): {
  id: string;
  isConfigured: boolean;
  status: 'CONNECTED' | 'MISSING_KEYS' | 'MOCK_MODE';
  keyRequired: string;
} {
  const normalized = marketplaceId.toLowerCase();
  
  if (normalized.includes('whop')) {
    return {
      id: 'whop',
      isConfigured: Boolean(process.env.WHOP_API_KEY),
      status: process.env.WHOP_API_KEY ? 'CONNECTED' : 'NOT_CONFIGURED',
      keyRequired: 'WHOP_API_KEY',
    };
  }
  if (normalized.includes('gumroad')) {
    return {
      id: 'gumroad',
      isConfigured: Boolean(process.env.GUMROAD_ACCESS_TOKEN),
      status: process.env.GUMROAD_ACCESS_TOKEN ? 'CONNECTED' : 'NOT_CONFIGURED',
      keyRequired: 'GUMROAD_ACCESS_TOKEN',
    };
  }
  if (normalized.includes('etsy')) {
    return {
      id: 'etsy',
      isConfigured: Boolean(process.env.ETSY_API_KEY),
      status: process.env.ETSY_API_KEY ? 'CONNECTED' : 'NOT_CONFIGURED',
      keyRequired: 'ETSY_API_KEY',
    };
  }
  if (normalized.includes('payhip')) {
    return {
      id: 'payhip',
      isConfigured: Boolean(process.env.PAYHIP_API_KEY),
      status: process.env.PAYHIP_API_KEY ? 'CONNECTED' : 'NOT_CONFIGURED',
      keyRequired: 'PAYHIP_API_KEY',
    };
  }

  return {
    id: marketplaceId,
    isConfigured: false,
    status: 'NOT_CONFIGURED',
    keyRequired: `${marketplaceId.toUpperCase()}_API_KEY`,
  };
}
