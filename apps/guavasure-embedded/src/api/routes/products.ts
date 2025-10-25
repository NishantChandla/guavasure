/**
 * Products API (Optional)
 * Handle product-related operations if needed
 */

import express from 'express';

const router = express.Router();

/**
 * Get Products
 * GET /api/products
 */
router.get('/', async (req, res) => {
  try {
    // Mock product list
    // In production, fetch from Shopify API
    const products = [
      {
        id: 'prod_001',
        title: 'Pet Insurance - Basic Plan',
        price: 500,
        description: 'Basic pet insurance coverage',
      },
      {
        id: 'prod_002',
        title: 'Pet Insurance - Premium Plan',
        price: 750,
        description: 'Premium pet insurance with extended coverage',
      },
    ];

    return res.json({ products });
  } catch (error: any) {
    console.error('Get products error:', error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
