# Shopify Project Setup

## Overview

This directory contains the Shopify-specific code for the Guavasure embedded application, separated from the main API to maintain clean architecture boundaries.

## Initial Setup

### 1. Install Dependencies

From the shopify directory:

```bash
cd src/shopify
npm install
```

This will install all Shopify-specific dependencies including:

- React and React DOM
- Shopify Polaris design system
- Shopify App Bridge
- Vite for building the admin panel
- TypeScript and type definitions

### 2. Environment Configuration

Create a `.env` file in the `src/shopify` directory:

```bash
cp .env.example .env
```

Then fill in your Shopify credentials:

```
VITE_SHOPIFY_CLIENT_ID=your_client_id_here
VITE_SHOPIFY_API_KEY=your_api_key_here
VITE_API_URL=http://localhost:3000
```

### 3. Verify TypeScript Configuration

The TypeScript setup includes:

- `tsconfig.json` - Main config for the Shopify project
- `admin/tsconfig.json` - Specific config for the admin panel
- `vite-env.d.ts` - Environment variable type definitions

## Development

### Running the Admin Panel

From the shopify directory:

```bash
npm run admin:dev
```

This will start the Vite dev server on port 3001 with hot module replacement.

### Running the Shopify App

```bash
npm run app:dev
```

This starts the Shopify CLI in development mode.

## Building

### Build the Admin Panel

```bash
npm run admin:build
```

Output will be in `../../dist/shopify/admin/`

### Build the Shopify App

```bash
npm run app:build
```

## Deployment

```bash
npm run app:deploy
```

This will deploy your app to Shopify.

## Folder Structure

```
shopify/
├── admin/                      # Admin panel (React + Vite)
│   ├── components/            # React components
│   │   └── SettingsForm.tsx  # Main settings component
│   ├── App.tsx               # Main app component
│   ├── index.tsx             # Entry point
│   ├── index.html            # HTML template
│   ├── vite.config.ts        # Vite configuration
│   └── tsconfig.json         # Admin TypeScript config
├── extensions/               # Shopify theme extensions
│   └── guavasure-widget/         # Cart upsell extension
├── package.json             # Shopify dependencies
├── tsconfig.json            # Main TypeScript config
├── vite-env.d.ts           # Vite environment types
├── shopify.app.toml        # Shopify app configuration
└── .env                    # Environment variables (create from .env.example)
```

## Architecture Notes

### Separation of Concerns

- **API Layer** (`apps/guavasure-embedded/src/api/`): Backend Node.js/Express API
- **Shopify Layer** (`apps/guavasure-embedded/src/shopify/`): Frontend admin panel and Shopify integrations

### Dependencies

Dependencies are now properly separated:

**Main package.json** (API only):

- Express, CORS, Multer
- Shopify API SDK
- Node.js types

**Shopify package.json** (Frontend only):

- React, React DOM
- Shopify Polaris, App Bridge
- Vite, TypeScript
- React types

### TypeScript Configuration

The main `tsconfig.json` in `guavasure-embedded` now excludes the shopify folder, treating it as a separate project. This prevents type conflicts and improves build performance.

## Troubleshooting

### Port Already in Use

If port 3001 is already in use, you can change it in `admin/vite.config.ts`:

```typescript
server: {
  port: 3002, // Change to your preferred port
  ...
}
```

### Type Errors

If you encounter type errors, ensure you've installed dependencies in the shopify folder:

```bash
cd src/shopify
npm install
```

### API Connection Issues

Ensure the main API is running on port 3000 (or update `VITE_API_URL` in `.env`):

```bash
# From the root of guavasure-embedded
npm run api:serve
```

## VS Code Setup

For optimal development experience, you may want to open the shopify folder as a separate workspace in VS Code to take advantage of the isolated TypeScript configuration.
