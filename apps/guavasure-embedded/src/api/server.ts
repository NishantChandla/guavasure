/**
 * Main Express server for Guavasure Embedded Shopify App
 * Handles Shopify OAuth, API routes, and webhooks
 */

import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import quoteRoutes from './routes/quote.js';
import checkoutRoutes from './routes/checkout.js';
import settingsRoutes from './routes/settings.js';
import webhooksRoutes from './routes/webhooks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Shopify webhook handler (raw body required)
app.post(
  '/api/webhooks/*',
  express.raw({ type: 'application/json' }),
  webhooksRoutes
);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quote', quoteRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  return res.json({ status: 'ok', app: 'Guavasure Embedded' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Guavasure Embedded running on http://localhost:${PORT}`);
  console.log(`📱 Admin UI: http://localhost:${PORT}/admin`);
  console.log(`🔐 OAuth Start: http://localhost:${PORT}/api/auth/shopify`);
});

export default app;
