# Guavasure Embedded - Architecture Documentation

## 🏗️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Shopify Store                          │
│  ┌──────────────┐                     ┌─────────────────┐  │
│  │  Admin UI    │                     │   Cart Page     │  │
│  │  (Embedded)  │                     │  + Extension    │  │
│  └──────┬───────┘                     └────────┬────────┘  │
│         │                                      │            │
└─────────┼──────────────────────────────────────┼────────────┘
          │                                      │
          │ Shopify                              │
          │ App Bridge                           │
          │                                      │
┌─────────▼──────────────────────────────────────▼────────────┐
│              Guavasure Embedded Backend                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │             Express Server (Port 3000)               │  │
│  │                                                      │  │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │  │
│  │  │   Auth     │  │   Quote    │  │   Checkout   │  │  │
│  │  │   Routes   │  │    API     │  │     API      │  │  │
│  │  └────────────┘  └────────────┘  └──────────────┘  │  │
│  │                                                      │  │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │  │
│  │  │  Settings  │  │  Webhooks  │  │   Shopify    │  │  │
│  │  │   Routes   │  │  Handler   │  │    Client    │  │  │
│  │  └────────────┘  └────────────┘  └──────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Frontend Admin UI (React + Vite)           │  │
│  │                Shopify Polaris Components            │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               │ API Calls
                               │
┌──────────────────────────────▼───────────────────────────────┐
│                  Guavasure Insurance API                     │
│              (Premium Calculation & Payment)                 │
└──────────────────────────────────────────────────────────────┘
```

## 📂 Directory Structure

```
apps/guavasure-embedded/
│
├── src/
│   │
│   ├── api/                                # Backend Express Server
│   │   ├── server.ts                       # Main Express app setup
│   │   ├── shopify.ts                      # Shopify API configuration
│   │   │
│   │   └── routes/                         # API Route Handlers
│   │       ├── auth.ts                     # OAuth flow (install, callback)
│   │       ├── quote.ts                    # Insurance quote generation
│   │       ├── checkout.ts                 # Payment processing
│   │       ├── settings.ts                 # Merchant configuration CRUD
│   │       ├── webhooks.ts                 # Shopify event handlers
│   │       └── products.ts                 # Product operations (optional)
│   │
│   ├── frontend/                           # Admin UI (React)
│   │   ├── index.tsx                       # React entry point
│   │   ├── App.tsx                         # Main app component
│   │   ├── index.html                      # HTML template
│   │   ├── vite.config.ts                  # Vite bundler config
│   │   │
│   │   └── components/                     # React Components
│   │       └── SettingsForm.tsx            # Merchant settings form
│   │
│   ├── extensions/                         # Shopify Extensions
│   │   └── guavasure-widget/                    # Theme App Extension
│   │       ├── shopify.extension.toml      # Extension config
│   │       │
│   │       ├── blocks/                     # Liquid Blocks
│   │       │   └── insurance-banner.liquid # Banner block for cart
│   │       │
│   │       ├── snippets/                   # Liquid Snippets
│   │       │   └── insurance-form.liquid   # Form snippet (modal)
│   │       │
│   │       └── assets/                     # JavaScript & CSS
│   │           ├── banner.js               # Banner click handler
│   │           └── modal.js                # Form submission & quote display
│   │
│   ├── main.ts                             # Application entry point
│   └── assets/                             # Static assets
│
├── shopify.app.toml                        # Shopify app configuration
├── project.json                            # Nx project configuration
├── package.json                            # Dependencies and scripts
├── tsconfig.json                           # TypeScript config (main)
├── tsconfig.app.json                       # TypeScript config (app)
├── env.example                             # Environment variables template
├── .gitignore                              # Git ignore rules
├── README.md                               # Project documentation
├── SETUP.md                                # Setup instructions
└── ARCHITECTURE.md                         # This file
```

## 🔄 Data Flow

### 1. App Installation Flow

```
Merchant → Shopify App Store
           ↓
       Install App
           ↓
   /api/auth/shopify?shop=store.myshopify.com
           ↓
     OAuth Redirect (Shopify)
           ↓
   /api/auth/callback
           ↓
   Store Session & Access Token
           ↓
   Redirect to Admin UI
```

### 2. Quote Generation Flow

```
Customer → Clicks Insurance Banner
           ↓
       Opens Modal Form
           ↓
   Fills Pet Details (name, breed, age, etc.)
           ↓
   Submit Form → POST /api/quote
           ↓
   Calculate Premium (backend logic)
           ↓
   Return Quote Object
           ↓
   Display Quote in Modal
           ↓
   Customer clicks "Proceed to Checkout"
           ↓
   POST /api/checkout
           ↓
   Create Checkout Session
           ↓
   Redirect to Payment Gateway
```

### 3. Settings Management Flow

```
Merchant → Opens Admin UI
           ↓
   GET /api/settings?shop=store.myshopify.com
           ↓
   Display Current Settings
           ↓
   Merchant Updates Settings
           ↓
   PUT /api/settings
           ↓
   Save to Storage (in-memory/DB)
           ↓
   Extension Reflects New Settings
```

### 4. Webhook Processing Flow

```
Shopify → Order Created Event
           ↓
   POST /api/webhooks/orders/create
           ↓
   Verify HMAC Signature
           ↓
   Parse Order Data
           ↓
   Check for Insurance Product
           ↓
   If insurance found:
     - Create Policy Record
     - Send Confirmation Email
     - Update Dashboard
```

## 🎨 Frontend Components

### Admin UI (React + Polaris)

**SettingsForm.tsx**

- Banner configuration (text, colors)
- Commission percentage slider
- Display options (cart/checkout)
- Theme customization
- Live preview

**App.tsx**

- Shopify App Bridge provider
- Polaris provider wrapper
- Route handling

### Theme Extension (Liquid + JS)

**insurance-banner.liquid**

- Visual banner display
- Configurable text and colors
- Click handler to open modal

**insurance-form.liquid**

- Pet information form fields
- Validation
- Loading states
- Quote display
- Checkout buttons

**banner.js**

- Modal open/close logic
- Settings fetch
- Analytics tracking

**modal.js**

- Form submission handler
- Quote API call
- Quote display rendering
- Checkout initiation

## 🔌 API Endpoints

### Authentication

```
GET  /api/auth/shopify        # Start OAuth flow
GET  /api/auth/callback       # OAuth callback
GET  /api/auth/verify         # Verify session
```

### Insurance Operations

```
POST /api/quote               # Generate insurance quote
POST /api/checkout            # Create checkout session
POST /api/checkout/complete   # Complete payment
GET  /api/checkout/:sessionId # Get checkout status
```

### Merchant Settings

```
GET    /api/settings?shop=...  # Get settings
PUT    /api/settings           # Update settings
DELETE /api/settings?shop=...  # Reset to defaults
```

### Webhooks

```
POST /api/webhooks/orders/create    # Order created
POST /api/webhooks/app/uninstalled  # App uninstalled
POST /api/webhooks/:topic           # Generic handler
```

### Utilities

```
GET /api/health               # Health check
GET /api/products             # List products (optional)
```

## 💾 Data Models

### Quote Object

```typescript
{
  quoteId: string; // Unique quote ID
  petDetails: {
    petName: string;
    breed: string;
    age: number;
    weight: number;
    isVaccinated: boolean;
    preExistingDiseases: string;
    isHealthyNow: boolean;
  }
  premium: {
    monthly: number;
    yearly: number;
    currency: string;
  }
  coverage: {
    accidentCoverage: string;
    illnessCoverage: string;
    wellnessCoverage: string;
    emergencyCare: string;
  }
  validUntil: string; // ISO timestamp
  timestamp: string; // ISO timestamp
}
```

### Settings Object

```typescript
{
  shop: string; // Shopify shop domain
  bannerEnabled: boolean; // Show/hide banner
  bannerText: string; // Banner message
  bannerButtonText: string; // CTA button text
  commission: number; // Commission percentage (0-30)
  bannerPosition: string; // Position on cart
  primaryColor: string; // Hex color
  secondaryColor: string; // Hex color
  showOnCart: boolean; // Display on cart page
  showOnCheckout: boolean; // Display on checkout page
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
```

### Checkout Session

```typescript
{
  sessionId: string;            // Unique session ID
  quoteId: string;              // Reference to quote
  status: string;               // pending | completed | failed
  paymentMethod: string;        // card | paypal | etc
  billingCycle: string;         // monthly | yearly
  paymentUrl: string;           // Payment gateway URL
  expiresAt: string;            // ISO timestamp
  amount: number;               // Payment amount
  currency: string;             // USD, CAD, etc
  customerEmail?: string;       // Customer email
  shop: string;                 // Shopify shop domain
  timestamp: string;            // ISO timestamp
}
```

## 🔐 Security Features

### Implemented

- ✅ Shopify OAuth 2.0 authentication
- ✅ HMAC webhook verification
- ✅ CORS protection
- ✅ Environment variable configuration
- ✅ Input validation on forms

### Production Requirements

- ⚠️ Database for persistent storage (currently in-memory)
- ⚠️ Redis for session management
- ⚠️ Rate limiting middleware
- ⚠️ Request body validation (express-validator)
- ⚠️ CSRF token protection
- ⚠️ SQL injection prevention
- ⚠️ XSS protection
- ⚠️ Helmet.js for security headers
- ⚠️ HTTPS enforcement

## 📊 Premium Calculation Logic

Located in: `src/api/routes/quote.ts`

```typescript
Base Premium: $500

Factors:
- Age > 7 years:    × 1.5
- Age > 3 years:    × 1.2
- Pre-existing:     × 1.3
- Not healthy:      × 1.4
- Vaccinated:       × 0.9 (discount)

Example:
Pet: Max, Golden Retriever, 8 years
- Base: $500
- Age factor: × 1.5 = $750
- Vaccinated: × 0.9 = $675
Final Monthly Premium: $675
```

## 🚀 Deployment Architecture

### Development

```
Local Machine (localhost:3000)
         ↓
    ngrok tunnel
         ↓
Shopify Development Store
```

### Production

```
┌─────────────────┐
│  Railway/Heroku │
│  Express Server │
└────────┬────────┘
         │
    ┌────▼────┐
    │ Shopify │
    │  Store  │
    └─────────┘
```

## 🔧 Configuration Files

### shopify.app.toml

- App metadata (name, client_id)
- OAuth scopes and redirect URLs
- Webhook subscriptions
- Extension paths
- Development settings

### project.json (Nx)

- Build targets
- Serve configuration
- Extension build/deploy commands
- Test configuration

### tsconfig.json

- TypeScript compiler options
- Path aliases
- Module resolution
- JSX configuration

### vite.config.ts

- React plugin
- Dev server configuration
- API proxy settings
- Build output paths

## 📈 Future Enhancements

### Phase 2

- [ ] PostgreSQL database integration
- [ ] Redis session storage
- [ ] Email notification system
- [ ] Policy management dashboard
- [ ] Multi-language support

### Phase 3

- [ ] Post-purchase upsell extension
- [ ] Customer self-service portal
- [ ] Claims management system
- [ ] Analytics and reporting
- [ ] Mobile app integration

### Phase 4

- [ ] AI-powered risk assessment
- [ ] Dynamic pricing based on breed
- [ ] Telemedicine integration
- [ ] Partnership with vet clinics
- [ ] Multi-pet family plans

## 🧪 Testing Strategy

### Unit Tests

- API route handlers
- Premium calculation logic
- Webhook verification
- Settings CRUD operations

### Integration Tests

- Shopify OAuth flow
- Quote → Checkout flow
- Extension → Backend communication
- Webhook processing

### E2E Tests

- Complete customer journey
- Merchant setup flow
- Payment processing
- Error handling scenarios

## 📞 Support & Maintenance

### Monitoring

- Server uptime monitoring
- Error tracking (Sentry)
- Performance metrics (New Relic)
- User analytics (Segment)

### Logging

- Express morgan middleware
- Structured logging (Winston)
- Error logs with stack traces
- Audit logs for sensitive operations

### Documentation

- API documentation (Swagger)
- Component documentation (Storybook)
- Deployment guides
- Troubleshooting wiki

---

**Last Updated:** October 24, 2025
**Version:** 0.0.1
**Author:** Guavasure Engineering Team
