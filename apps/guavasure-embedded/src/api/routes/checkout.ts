/**
 * Insurance Checkout & Payment API
 * Handles payment processing for insurance policies
 */

import express from 'express';

const router = express.Router();

/**
 * Initialize Checkout Session
 * POST /api/checkout
 * Body: { quoteId, paymentMethod, billingCycle }
 */
router.post('/', async (req, res) => {
  try {
    const { quoteId, paymentMethod, billingCycle, customerEmail, shop } =
      req.body;

    // Validate required fields
    if (!quoteId || !paymentMethod || !billingCycle) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['quoteId', 'paymentMethod', 'billingCycle'],
      });
    }

    // Mock payment gateway integration
    // In production: integrate with Stripe, PayPal, etc.
    const checkoutSession = {
      sessionId: `CHECKOUT-${Date.now()}`,
      quoteId,
      status: 'pending',
      paymentMethod,
      billingCycle,
      paymentUrl: `${process.env.HOST}/payment/${quoteId}`, // Mock payment URL
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      amount: billingCycle === 'monthly' ? 500 : 5400, // Mock amounts
      currency: 'USD',
      customerEmail,
      shop,
      timestamp: new Date().toISOString(),
    };

    console.log(`💳 Checkout session created: ${checkoutSession.sessionId}`);

    return res.json(checkoutSession);
  } catch (error: any) {
    console.error('Checkout error:', error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Complete Payment (Mock)
 * POST /api/checkout/complete
 * Body: { sessionId, paymentToken }
 */
router.post('/complete', async (req, res) => {
  try {
    const { sessionId, paymentToken } = req.body;

    if (!sessionId || !paymentToken) {
      return res
        .status(400)
        .json({ error: 'Missing sessionId or paymentToken' });
    }

    // Mock payment processing
    const paymentResult = {
      success: true,
      policyId: `POLICY-${Date.now()}`,
      sessionId,
      paymentStatus: 'completed',
      transactionId: `TXN-${Date.now()}`,
      paidAmount: 500,
      currency: 'USD',
      policyStartDate: new Date().toISOString(),
      policyEndDate: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      timestamp: new Date().toISOString(),
    };

    console.log(`✅ Payment completed: ${paymentResult.transactionId}`);

    return res.json(paymentResult);
  } catch (error: any) {
    console.error('Payment completion error:', error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Get Checkout Status
 * GET /api/checkout/:sessionId
 */
router.get('/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  // Mock status check
  return res.json({
    sessionId,
    status: 'pending',
    message: 'Payment in progress',
  });
});

export default router;
