/**
 * Merchant Settings API
 * CRUD operations for app configuration per shop
 */

import express from 'express';

const router = express.Router();

// In-memory settings storage (use database in production)
const settingsStore: Record<string, any> = {};

console.log('settingsStore', settingsStore);

/**
 * Get Settings for a Shop
 * GET /api/settings?shop=store-name.myshopify.com
 */
router.get('/', async (req, res) => {
  try {
    const { shop } = req.query;

    if (!shop || typeof shop !== 'string') {
      return res.status(400).json({ error: 'Missing shop parameter' });
    }

    // Get settings or return defaults
    const settings = settingsStore[shop] || {
      shop,
      bannerEnabled: true,
      bannerText: '🛡️ Insure your pet for peace of mind!',
      bannerButtonText: 'Get Quote',
      commission: 10, // Commission percentage
      bannerPosition: 'above-checkout', // Position in cart
      primaryColor: '#4A90E2',
      secondaryColor: '#50E3C2',
      showOnCart: true,
      showOnCheckout: false,
      bannerIcon: '🐾',
      showIcon: true,
      buttonColor: '#FFFFFF',
      textColor: '#FFFFFF',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return res.json(settings);
  } catch (error: any) {
    console.error('Get settings error:', error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Update Settings for a Shop
 * PUT /api/settings
 * Body: { shop, bannerEnabled, bannerText, commission, ... }
 */
router.put('/', async (req, res) => {
  try {
    const { shop, ...settingsData } = req.body;

    if (!shop) {
      return res.status(400).json({ error: 'Missing shop parameter' });
    }

    // Merge with existing settings
    const currentSettings = settingsStore[shop] || {};
    const updatedSettings = {
      ...currentSettings,
      ...settingsData,
      shop,
      updatedAt: new Date().toISOString(),
    };

    // Store updated settings
    settingsStore[shop] = updatedSettings;

    console.log(`⚙️  Settings updated for shop: ${shop}`);

    return res.json(updatedSettings);
  } catch (error: any) {
    console.error('Update settings error:', error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Reset Settings to Defaults
 * DELETE /api/settings?shop=store-name.myshopify.com
 */
router.delete('/', async (req, res) => {
  try {
    const { shop } = req.query;

    if (!shop || typeof shop !== 'string') {
      return res.status(400).json({ error: 'Missing shop parameter' });
    }

    delete settingsStore[shop];

    console.log(`🗑️  Settings reset for shop: ${shop}`);

    return res.json({
      success: true,
      message: 'Settings reset to defaults',
    });
  } catch (error: any) {
    console.error('Reset settings error:', error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
