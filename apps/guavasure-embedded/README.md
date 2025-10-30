# Guavasure Embedded - Shopify Pet Insurance App

A complete Shopify app that allows merchants to offer pet insurance directly from their cart page. Built with Express, React, Shopify Polaris, and Theme App Extensions.

## 🏗️ Architecture

### Backend API (Express)

- **Auth Routes** (`/api/auth`) - Shopify OAuth flow
- **Quote API** (`/api/quote`) - Generate insurance quotes based on pet details
- **Checkout API** (`/api/checkout`) - Handle payment processing
- **Settings API** (`/api/settings`) - Merchant configuration CRUD
- **Webhooks** (`/api/webhooks`) - Shopify event handlers

### Frontend Admin UI (React + Polaris)

- Embedded admin interface for merchants
- Configure banner text, colors, commission percentage
- Toggle insurance banner on/off
- Preview banner appearance

### Cart Extension (Theme App Extension)

- Insurance banner on cart page
- Modal form for pet details
- Quote display
- Checkout flow

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Shopify Partner Account
- Shopify Development Store

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

```bash
cp .env.example .env
# Edit .env with your Shopify credentials
```

3. **Configure Shopify App:**

- Create a new app in Shopify Partner Dashboard
- Copy API Key and API Secret to `.env`
- Update `shopify.app.toml` with your app details

4. **Build and run:**

```bash
# Build backend
nx build guavasure-embedded

# Run backend server
nx serve guavasure-embedded

# In another terminal, run frontend dev server
cd apps/guavasure-embedded
npm run dev:frontend

# Build and deploy extension
npm run build:extension
```

## 📁 Project Structure

```
apps/guavasure-embedded/
├── src/
│   ├── api/                      # Express backend
│   │   ├── server.ts             # Main server file
│   │   ├── shopify.ts            # Shopify API config
│   │   └── routes/
│   │       ├── auth.ts           # OAuth routes
│   │       ├── quote.ts          # Insurance quote API
│   │       ├── checkout.ts       # Payment processing
│   │       ├── settings.ts       # Merchant settings CRUD
│   │       └── webhooks.ts       # Shopify webhooks
│   │
│   ├── frontend/                 # React Admin UI
│   │   ├── index.tsx             # Entry point
│   │   ├── App.tsx               # App wrapper
│   │   ├── components/
│   │   │   └── SettingsForm.tsx  # Settings configuration
│   │   ├── index.html            # HTML template
│   │   └── vite.config.ts        # Vite config
│   │
│   └── extensions/               # Shopify Extensions
│       └── guavasure-widget/
│           ├── blocks/
│           │   └── insurance-banner.liquid
│           ├── snippets/
│           │   └── insurance-form.liquid
│           ├── assets/
│           │   ├── banner.js     # Banner logic
│           │   └── modal.js      # Form & quote logic
│           └── shopify.extension.toml
│
├── shopify.app.toml              # Shopify app config
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Configuration

### Shopify App Settings

Edit `shopify.app.toml`:

```toml
name = "guavasure-embedded"
client_id = "YOUR_API_KEY"
application_url = "https://YOUR_APP_URL"
embedded = true
```

### Environment Variables

Key variables in `.env`:

- `SHOPIFY_CLIENT_ID` - Your Shopify API key
- `SHOPIFY_API_SECRET` - Your Shopify API secret
- `HOST` - Your app URL
- `PORT` - Server port (default: 3000)

## 🎨 Merchant Configuration

Merchants can configure:

- ✅ Enable/disable insurance banner
- 📝 Banner text and button text
- 🎨 Primary and secondary colors
- 💰 Commission percentage
- 📍 Banner position on cart
- 👀 Show on cart/checkout pages

## 📋 Insurance Quote Flow

1. **Customer clicks banner** → Opens modal
2. **Customer fills form** → Pet details (name, breed, age, etc.)
3. **Submit form** → Calls `/api/quote`
4. **Display quote** → Shows premium and coverage
5. **Proceed to checkout** → Calls `/api/checkout`
6. **Payment** → Redirects to payment gateway
7. **Webhook** → Records policy creation

## 🔌 API Endpoints

### Quote API

```typescript
POST /api/quote
Body: {
  petName: string
  breed: string
  age: number
  weight: number
  isVaccinated: boolean
  preExistingDiseases: string
  isHealthyNow: boolean
}
Response: {
  quoteId: string
  premium: { monthly: number, yearly: number }
  coverage: { ... }
}
```

### Settings API

```typescript
GET /api/settings?shop=store.myshopify.com
PUT /api/settings
Body: {
  shop: string
  bannerEnabled: boolean
  bannerText: string
  commission: number
  ...
}
```

## 🧪 Testing

### Local Development

1. Start backend: `nx serve guavasure-embedded`
2. Start frontend: `npm run dev:frontend`
3. Use ngrok to expose localhost: `ngrok http 3000`
4. Update `shopify.app.toml` with ngrok URL
5. Install app on development store

### Testing Extensions

```bash
shopify app extension push
```

## 🚢 Deployment

### Backend Deployment

- Deploy Express app to Railway, Heroku, or DigitalOcean
- Set environment variables
- Update `shopify.app.toml` with production URL

### Extension Deployment

```bash
shopify app extension deploy
```

### Frontend Deployment

- Build frontend: `npm run build:frontend`
- Serve static files from Express or CDN

## 📊 Webhooks

Configured webhooks:

- `orders/create` - Triggered when order contains insurance
- `app/uninstalled` - Cleanup when app is uninstalled

Webhook endpoint: `/api/webhooks/:topic`

## 🔐 Security

- ✅ HMAC verification for webhooks
- ✅ Shopify OAuth flow
- ✅ Session validation
- ✅ CORS protection
- ⚠️ Use database for session storage in production
- ⚠️ Use Redis for rate limiting
- ⚠️ Implement proper error handling

## 📈 Future Enhancements

- [ ] Database integration (PostgreSQL)
- [ ] Redis session storage
- [ ] Post-purchase upsell extension
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Multi-pet support
- [ ] Policy management portal
- [ ] Customer self-service portal

## 🤝 Contributing

This is a monorepo app. Follow Nx conventions:

- Keep all code in `apps/guavasure-embedded`
- Use ES modules (import/export)
- TypeScript for type safety
- Follow existing code patterns

## 📝 License

Proprietary - Guavasure Inc.

## 📞 Support

For issues or questions:

- Email: support@guavasure.com
- Docs: https://docs.guavasure.com
