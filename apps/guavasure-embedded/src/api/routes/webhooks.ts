/**
 * Shopify Webhooks Handler
 * Processes order creation and other Shopify events
 */

import express from 'express';
import * as crypto from 'crypto';

const router = express.Router();

/**
 * Verify Shopify Webhook HMAC
 */
const verifyWebhook = (body: Buffer, hmacHeader: string): boolean => {
  const secret = process.env.SHOPIFY_API_SECRET || '';
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body.toString(), 'utf8')
    .digest('base64');

  return hash === hmacHeader;
};

/**
 * Orders Create Webhook
 * POST /api/webhooks/orders/create
 */
router.post('/orders/create', async (req, res) => {
  try {
    const hmac = req.get('X-Shopify-Hmac-SHA256');
    const shop = req.get('X-Shopify-Shop-Domain');

    // Verify webhook authenticity
    if (!hmac || !verifyWebhook(req.body as Buffer, hmac)) {
      console.warn('⚠️  Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Parse order data
    const orderData = JSON.parse(req.body.toString());

    console.log(`📦 Order webhook received from ${shop}`);
    console.log(`   Order ID: ${orderData.id}`);
    console.log(`   Order Number: ${orderData.order_number}`);
    console.log(`   Total: ${orderData.total_price} ${orderData.currency}`);

    // Check if order contains insurance product
    const hasInsurance = orderData.line_items?.some(
      (item: any) =>
        item.title?.toLowerCase().includes('pet insurance') ||
        item.sku?.toLowerCase().includes('insurance')
    );

    if (hasInsurance) {
      console.log('   🛡️  Insurance product detected in order');
      // TODO: Process insurance policy creation
      // TODO: Send confirmation email
      // TODO: Update merchant dashboard
    }

    // Acknowledge webhook
    return res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * App Uninstalled Webhook
 * POST /api/webhooks/app/uninstalled
 */
router.post('/app/uninstalled', async (req, res) => {
  try {
    const shop = req.get('X-Shopify-Shop-Domain');

    console.log(`❌ App uninstalled from ${shop}`);

    // TODO: Cleanup shop data, revoke access tokens

    res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Uninstall webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Generic Webhook Handler (for testing)
 * POST /api/webhooks/:topic
 */
router.post('/:topic', async (req, res) => {
  try {
    const { topic } = req.params;
    const shop = req.get('X-Shopify-Shop-Domain');

    console.log(`📨 Webhook received: ${topic} from ${shop}`);

    res.status(200).json({ received: true, topic, shop });
  } catch (error: any) {
    console.error('Generic webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
