# Guavasure Shopify Integration

This directory contains all Shopify-specific code including the admin UI and theme extensions.

## Structure

```
shopify/
├── admin/              # Admin panel (Vite + React)
│   ├── components/     # React components
│   ├── App.tsx         # Main app component
│   ├── index.tsx       # Entry point
│   ├── index.html      # HTML template
│   └── vite.config.ts  # Vite configuration
├── extensions/         # Shopify theme extensions
│   └── cart-upsell/    # Cart upsell extension
├── package.json        # Shopify-specific dependencies
├── tsconfig.json       # TypeScript configuration
├── shopify.app.toml    # Shopify app configuration
└── .env.example        # Environment variables template
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file from `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Fill in your Shopify credentials in `.env`

## Development

### Admin Panel

Run the admin development server:

```bash
npm run admin:dev
```

Build the admin panel:

```bash
npm run admin:build
```

### Shopify App

Run the Shopify app in development mode:

```bash
npm run app:dev
```

Deploy the Shopify app:

```bash
npm run app:deploy
```

## Dependencies

- **React**: UI framework for the admin panel
- **@shopify/polaris**: Shopify's design system
- **@shopify/app-bridge-react**: Shopify App Bridge integration
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type safety

## Environment Variables

- `VITE_SHOPIFY_CLIENT_ID`: Your Shopify app client ID
- `VITE_SHOPIFY_API_KEY`: Your Shopify API key
- `VITE_API_URL`: Backend API URL (default: http://localhost:3000)
