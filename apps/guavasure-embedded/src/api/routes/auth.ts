/**
 * Shopify OAuth Authentication Routes
 * Handles installation, callback, and session verification
 */

import express from 'express';
import { shopify, storeSession } from '../shopify.js';

const router = express.Router();

/**
 * OAuth Start - Redirect merchant to Shopify for authorization
 * GET /api/auth/shopify?shop=store-name.myshopify.com
 */
router.get('/shopify', async (req, res) => {
  const { shop } = req.query;

  if (!shop || typeof shop !== 'string') {
    return res.status(400).json({ error: 'Missing shop parameter' });
  }

  try {
    await shopify.auth.begin({
      shop: shopify.utils.sanitizeShop(shop, true) || '',
      callbackPath: '/api/auth/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });
  } catch (error: any) {
    console.error('OAuth start error:', error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * OAuth Callback - Exchange code for access token
 * GET /api/auth/callback
 */
router.get('/callback', async (req, res) => {
  try {
    const callback = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    console.log('callback', callback);

    // Store session
    await storeSession(callback.session);

    console.log(`✅ Shop ${callback.session.shop} authenticated successfully`);

    return res.redirect(`${callback.session.shop}/admin/apps/guavasure`);
  } catch (error: any) {
    console.error('OAuth callback error:', error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Verify Session - Check if merchant is authenticated
 * GET /api/auth/verify
 */
router.get('/verify', async (req, res) => {
  try {
    const { shop } = req.query;

    if (!shop) {
      return res
        .status(401)
        .json({ authenticated: false, error: 'No shop provided' });
    }

    // In production, verify JWT token from Shopify App Bridge
    // For now, simple mock
    return res.json({
      authenticated: true,
      shop,
      message: 'Session verified',
    });
  } catch (error: any) {
    return res.status(401).json({ authenticated: false, error: error.message });
  }
});

export default router;
