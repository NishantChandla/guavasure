/**
 * Shopify API Configuration and Session Management
 * Handles Shopify OAuth and API client initialization
 */

import { shopifyApi, ApiVersion, Session } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';

// In-memory session storage (use Redis/DB in production)
const sessionStorage: Record<string, Session> = {};

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_CLIENT_ID || '',
  apiSecretKey: process.env.SHOPIFY_API_SECRET || '',
  scopes: ['read_products', 'write_products', 'read_orders', 'write_orders'],
  hostName: process.env.HOST || 'localhost:3000',
  hostScheme: process.env.NODE_ENV === 'production' ? 'https' : 'http',
  apiVersion: ApiVersion.October23,
  isEmbeddedApp: true,
  isCustomStoreApp: false,
});

/**
 * Store session data (merchant's access token, shop info)
 */
export const storeSession = async (session: Session): Promise<void> => {
  sessionStorage[session.id] = session;
  console.log(`✅ Session stored for shop: ${session.shop}`);
};

/**
 * Load session data
 */
export const loadSession = async (
  sessionId: string
): Promise<Session | undefined> => {
  return sessionStorage[sessionId];
};

/**
 * Delete session data
 */
export const deleteSession = async (sessionId: string): Promise<void> => {
  delete sessionStorage[sessionId];
  console.log(`🗑️  Session deleted: ${sessionId}`);
};

/**
 * Get Shopify GraphQL client for a session
 */
export const getGraphQLClient = async (shop: string, accessToken: string) => {
  return new shopify.clients.Graphql({ session: { shop, accessToken } as any });
};

/**
 * Get Shopify REST client for a session
 */
export const getRESTClient = async (shop: string, accessToken: string) => {
  return new shopify.clients.Rest({ session: { shop, accessToken } as any });
};

export default shopify;
