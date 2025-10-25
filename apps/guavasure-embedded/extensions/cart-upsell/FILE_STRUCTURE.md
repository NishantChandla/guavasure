# Extension File Structure

Visual overview of the complete extension structure and file relationships.

```
cart-upsell/
│
├── 📄 shopify.extension.toml          # Extension configuration
│   └── Defines extension type, name, and UID
│
├── 📁 blocks/                          # Shopify theme blocks
│   └── 📄 insurance-banner.liquid     # Main banner block (213 lines)
│       ├── HTML structure with inline styles
│       ├── Modal container (hidden by default)
│       ├── Progress steps UI
│       ├── Dynamic modal body
│       └── Schema with 18+ settings
│
├── 📁 assets/                          # Static assets (JS, CSS, images)
│   ├── 📄 insurance-modal.js          # Modal functionality (525 lines)
│   │   ├── GuavasureInsurance global object
│   │   ├── State management (currentStep, petData, quoteData, etc.)
│   │   ├── Step rendering functions (4 steps)
│   │   ├── Form submission handlers
│   │   ├── API integration
│   │   └── Event listeners
│   │
│   ├── 📄 insurance-modal.css         # Modal styling (655 lines)
│   │   ├── Modal system styles
│   │   ├── Progress steps UI
│   │   ├── Form styling
│   │   ├── Button styles
│   │   ├── Quote display
│   │   ├── Payment form
│   │   ├── Policy display
│   │   ├── Responsive breakpoints
│   │   └── Accessibility styles
│   │
│   └── 🖼️ thumbs-up.png              # Example asset
│
├── 📁 snippets/                        # Reusable Liquid snippets
│   └── 📄 insurance-trigger.liquid    # Optional trigger button/link (45 lines)
│       └── Renders clickable trigger anywhere in theme
│
├── 📁 locales/                         # Internationalization files
│   └── 📄 en.default.json             # English translations (72 lines)
│       └── All UI text, labels, and messages
│
└── 📁 docs/                            # Documentation
    ├── 📄 README.md                    # Comprehensive guide (450+ lines)
    │   ├── Features overview
    │   ├── File structure
    │   ├── Customization options
    │   ├── User flow details
    │   ├── API specs
    │   ├── Troubleshooting
    │   └── Development guide
    │
    ├── 📄 INSTALLATION.md              # Step-by-step setup (400+ lines)
    │   ├── Prerequisites
    │   ├── Deployment steps
    │   ├── Configuration guide
    │   ├── Testing checklist
    │   └── Troubleshooting
    │
    ├── 📄 CHANGELOG.md                 # Version history (150+ lines)
    │   ├── v2.0.0 complete rebuild
    │   └── Future roadmap
    │
    ├── 📄 EXTENSION_SUMMARY.md         # Build summary
    │   ├── Project overview
    │   ├── Component details
    │   ├── Integration points
    │   └── Success metrics
    │
    ├── 📄 EXAMPLES.md                  # Configuration examples
    │   ├── 6 theme presets
    │   ├── Industry-specific configs
    │   ├── A/B testing variations
    │   ├── Technical integrations
    │   └── Multi-language examples
    │
    └── 📄 FILE_STRUCTURE.md            # This file
        └── Visual structure overview
```

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         CART PAGE                                │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │         insurance-banner.liquid (Block)                │    │
│  │                                                          │    │
│  │  [Icon] [Text Content]              [CTA Button] ──────┼────┼──┐
│  └────────────────────────────────────────────────────────┘    │  │
│                                                                   │  │
└───────────────────────────────────────────────────────────────┘  │
                                                                     │
                                                                     │ Click
                                                                     │
                                                                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MODAL (insurance-modal.js)                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Progress:  [1] Pet Details → [2] Quote → [3] Payment → [4] Policy  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    STEP 1: Pet Details                   │   │
│  │  • Pet Name, Type, Breed                                 │   │
│  │  • Age, Weight                                            │   │
│  │  • Health Status                                          │   │
│  │                                                            │   │
│  │  [Cancel]  [Get My Quote →] ─────────────────────────────┼───┼──┐
│  └─────────────────────────────────────────────────────────┘   │  │
└───────────────────────────────────────────────────────────────┘  │
                                                                     │
                                                                     │ Submit
                                                                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API CALL: POST /api/quote                    │
│  Request:                                                         │
│  {                                                                │
│    petName, breed, age, weight,                                  │
│    isVaccinated, isHealthyNow, preExistingDiseases              │
│  }                                                                │
│                                                                   │
│  Response:                                                        │
│  {                                                                │
│    quoteId, petDetails, premium, coverage, validUntil           │
│  }                                                                │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    STEP 2: Quote Display                 │   │
│  │                                                            │   │
│  │  ┌──────────────┐     ┌──────────────────┐             │   │
│  │  │   Monthly    │     │  Annual (Best)   │             │   │
│  │  │   $50/mo     │     │  $540/yr         │             │   │
│  │  │ [Choose] ────┼─────┼─► [Choose]       │             │   │
│  │  └──────────────┘     └──────────────────┘             │   │
│  │                                                            │   │
│  │  Coverage Details...                                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
                           │
                           ▼ Select Plan
┌─────────────────────────────────────────────────────────────────┐
│                  API CALL: POST /api/checkout                    │
│  Request:                                                         │
│  {                                                                │
│    quoteId, paymentMethod, billingCycle, shop                   │
│  }                                                                │
│                                                                   │
│  Response:                                                        │
│  {                                                                │
│    sessionId, status, amount, currency, expiresAt               │
│  }                                                                │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    STEP 3: Payment Form                  │   │
│  │                                                            │   │
│  │  Order Summary:                                            │   │
│  │  Pet: Max (Golden Retriever)                              │   │
│  │  Plan: Monthly                                             │   │
│  │  Total: $50 USD                                            │   │
│  │                                                            │   │
│  │  Email: _______________                                    │   │
│  │  Card:  _______________                                    │   │
│  │  Expiry: _____  CVV: ___                                   │   │
│  │  ☑ Terms                                                   │   │
│  │                                                            │   │
│  │  [← Back]  [Complete Purchase →] ────────────────────────┼───┼──┐
│  └─────────────────────────────────────────────────────────┘   │  │
└───────────────────────────────────────────────────────────────┘  │
                                                                     │
                                                                     │ Submit
                                                                     ▼
┌─────────────────────────────────────────────────────────────────┐
│              API CALL: POST /api/checkout/complete               │
│  Request:                                                         │
│  {                                                                │
│    sessionId, paymentToken, customerEmail                        │
│  }                                                                │
│                                                                   │
│  Response:                                                        │
│  {                                                                │
│    success, policyId, paymentStatus, transactionId,             │
│    paidAmount, policyStartDate, policyEndDate                   │
│  }                                                                │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    STEP 4: Policy Display                │   │
│  │                                                            │   │
│  │         ✓ Policy Activated! 🎉                           │   │
│  │                                                            │   │
│  │  Policy Number: POLICY-1234567890                         │   │
│  │  Coverage: Jan 1, 2025 - Jan 1, 2026                     │   │
│  │  Transaction: TXN-1234567890                              │   │
│  │                                                            │   │
│  │  [📄 Download Policy]  [📧 Email Policy]                 │   │
│  │                                                            │   │
│  │  [Done] ───────────────────────────────────────────────────┼───┼──► Close Modal
│  └─────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
```

## 🎨 Theme Editor Integration

```
Shopify Admin
│
├── Online Store
│   └── Themes
│       └── Customize (Theme Editor)
│           └── Cart Page
│               └── Add Block
│                   └── Apps
│                       └── Pet Insurance Banner ◄─── insurance-banner.liquid
│                           │
│                           ├── Banner Settings
│                           │   ├── Enable Banner (toggle)
│                           │   ├── Banner Title (text)
│                           │   ├── Banner Subtitle (textarea)
│                           │   └── Button Text (text)
│                           │
│                           ├── Icon Settings
│                           │   ├── Show Icon (toggle)
│                           │   └── Banner Icon (text/emoji)
│                           │
│                           ├── Color Customization
│                           │   ├── Primary Color (color picker)
│                           │   ├── Secondary Color (color picker)
│                           │   ├── Text Color (color picker)
│                           │   ├── Button Color (color picker)
│                           │   └── Button Text Color (color picker)
│                           │
│                           ├── Spacing & Size
│                           │   ├── Banner Padding (range: 12-40px)
│                           │   ├── Banner Margin (range: 0-40px)
│                           │   ├── Border Radius (range: 0-20px)
│                           │   └── Button Border Radius (range: 0-50px)
│                           │
│                           └── Typography
│                               ├── Title Font Size (range: 14-32px)
│                               ├── Subtitle Font Size (range: 12-24px)
│                               └── Button Font Size (range: 12-20px)
│
└── Apps
    └── Guavasure
        └── Settings ◄─── SettingsForm.tsx
            │
            ├── Banner Settings
            │   ├── Enable banner on cart
            │   ├── Banner Text
            │   ├── Button Text
            │   └── Banner Position (dropdown)
            │
            ├── Commission & Pricing
            │   └── Commission Percentage (slider: 0-30%)
            │
            ├── Display Options
            │   ├── Show on cart page
            │   └── Show on checkout page
            │
            ├── Icon Settings
            │   ├── Show icon on banner
            │   └── Banner Icon (Emoji)
            │
            ├── Theme Customization
            │   ├── Primary Color
            │   ├── Secondary Color
            │   ├── Text Color
            │   └── Button Background
            │
            └── Preview
                └── Live banner preview
```

## 📡 API Integration Map

```
Frontend (Modal)                 Backend (Express)
│
├── GuavasureInsurance.handlePetDetailsSubmit()
│   │
│   └──► POST /api/quote ──────────► quote.ts
│           │                         ├── calculatePremium()
│           │                         └── Return quote object
│           │
│           ◄──────────────────────── { quoteId, premium, coverage }
│
├── GuavasureInsurance.selectPlan()
│   │
│   └──► POST /api/checkout ───────► checkout.ts
│           │                         ├── Create session
│           │                         └── Return checkout session
│           │
│           ◄──────────────────────── { sessionId, amount }
│
├── GuavasureInsurance.handlePaymentSubmit()
│   │
│   └──► POST /api/checkout/complete ──► checkout.ts
│           │                              ├── Process payment
│           │                              ├── Generate policy
│           │                              └── Return policy data
│           │
│           ◄────────────────────────────  { policyId, transactionId }
│
└── Settings (Admin Panel)
    │
    ├──► GET /api/settings?shop=... ──► settings.ts
    │       │                             └── Return shop settings
    │       │
    │       ◄────────────────────────────  { bannerEnabled, colors, ... }
    │
    └──► PUT /api/settings ───────────► settings.ts
            │                             ├── Update settings
            │                             └── Store in memory/DB
            │
            ◄────────────────────────────  { success: true }
```

## 🗄️ State Management

```javascript
// Global State (insurance-modal.js)

currentStep: number           // 1, 2, 3, or 4
├── Controls which step UI to render
└── Updated by showStep()

petData: object               // Customer's pet information
├── petName: string
├── petType: 'dog' | 'cat' | 'other'
├── breed: string
├── age: number
├── weight: number
├── isVaccinated: boolean
├── isHealthyNow: boolean
└── preExistingDiseases: string[]

quoteData: object | null      // Quote from API
├── quoteId: string
├── petDetails: object
├── premium: { monthly, yearly, currency }
├── coverage: object
├── validUntil: string
└── timestamp: string

checkoutSession: object | null // Checkout session from API
├── sessionId: string
├── quoteId: string
├── status: string
├── paymentMethod: string
├── billingCycle: 'monthly' | 'yearly'
├── amount: number
├── currency: string
└── expiresAt: string

policyData: object | null     // Policy after payment
├── policyId: string
├── sessionId: string
├── paymentStatus: string
├── transactionId: string
├── paidAmount: number
├── currency: string
├── policyStartDate: string
└── policyEndDate: string
```

## 🎯 Component Hierarchy

```
insurance-banner.liquid
│
├── Banner Container
│   ├── Banner Icon (optional)
│   ├── Text Content
│   │   ├── Title
│   │   └── Subtitle
│   └── CTA Button
│       └── onclick → GuavasureInsurance.openModal()
│
├── Modal Container (hidden)
│   ├── Overlay
│   │   └── onclick → closeModal()
│   │
│   └── Modal Content
│       ├── Close Button (X)
│       ├── Progress Steps
│       │   ├── Step 1 (Pet Details)
│       │   ├── Step 2 (Quote)
│       │   ├── Step 3 (Payment)
│       │   └── Step 4 (Policy)
│       │
│       └── Modal Body
│           └── Dynamic content based on currentStep
│
├── Script Tag
│   └── insurance-modal.js
│
└── Stylesheet Tag
    └── insurance-modal.css
```

## 📋 File Dependencies

```
insurance-banner.liquid
│
├── Requires:
│   ├── insurance-modal.js
│   ├── insurance-modal.css
│   └── en.default.json (locale)
│
└── Optional:
    └── insurance-trigger.liquid (for additional triggers)

insurance-modal.js
│
├── Depends on:
│   ├── Browser Fetch API
│   ├── FormData API
│   └── Backend APIs:
│       ├── /api/quote
│       ├── /api/checkout
│       └── /api/checkout/complete
│
└── Provides:
    └── window.GuavasureInsurance (global object)

insurance-modal.css
│
└── Standalone (no dependencies)

SettingsForm.tsx
│
├── Depends on:
│   ├── React
│   ├── @shopify/polaris
│   ├── axios
│   └── /api/settings
│
└── Provides:
    └── Admin UI for merchant settings
```

## 🚀 Build Output

```
Source Files (development)        Compiled Files (production)
│
src/
├── api/
│   └── routes/
│       └── settings.ts      →   dist/api/routes/settings.js
│
└── frontend/
    └── components/
        └── SettingsForm.tsx →   (bundled in app)

extensions/cart-upsell/
├── blocks/
│   └── insurance-banner.liquid  (no compilation needed)
├── assets/
│   ├── insurance-modal.js       (no compilation needed)
│   └── insurance-modal.css      (no compilation needed)
├── snippets/
│   └── insurance-trigger.liquid (no compilation needed)
└── locales/
    └── en.default.json          (no compilation needed)
```

## 📦 Deployment Package

```
When deployed via `shopify app deploy`:

guavasure-embedded-extension.zip
│
├── shopify.extension.toml
├── blocks/insurance-banner.liquid
├── assets/
│   ├── insurance-modal.js
│   ├── insurance-modal.css
│   └── thumbs-up.png
├── snippets/insurance-trigger.liquid
└── locales/en.default.json

Shopify processes and makes available:
├── In theme editor as "Pet Insurance Banner" block
├── Assets served from Shopify CDN
└── Locales loaded based on store language
```

---

## 📊 File Size Summary

| File                     | Lines     | Size      | Type        |
| ------------------------ | --------- | --------- | ----------- |
| insurance-banner.liquid  | 213       | ~8KB      | Liquid/HTML |
| insurance-modal.js       | 525       | ~22KB     | JavaScript  |
| insurance-modal.css      | 655       | ~25KB     | CSS         |
| insurance-trigger.liquid | 45        | ~2KB      | Liquid      |
| en.default.json          | 72        | ~3KB      | JSON        |
| **Total Extension**      | **1,510** | **~60KB** | **Mixed**   |

| Documentation        | Lines      | Size       |
| -------------------- | ---------- | ---------- |
| README.md            | 450+       | ~25KB      |
| INSTALLATION.md      | 400+       | ~22KB      |
| CHANGELOG.md         | 150+       | ~8KB       |
| EXTENSION_SUMMARY.md | 600+       | ~35KB      |
| EXAMPLES.md          | 700+       | ~38KB      |
| FILE_STRUCTURE.md    | 500+       | ~28KB      |
| **Total Docs**       | **2,800+** | **~156KB** |

**Grand Total:** ~4,300 lines | ~216KB

---

**This file structure represents a production-ready, enterprise-grade Shopify extension.** 🚀
