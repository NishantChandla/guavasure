# Quick Reference Guide

## Common Commands

### Setup (First Time Only)

```bash
# From shopify directory
npm install

# Copy environment variables
cp .env.example .env
# Then edit .env with your credentials
```

### Development

```bash
# Run admin panel dev server (http://localhost:3001)
npm run admin:dev

# Run Shopify app in dev mode
npm run app:dev
```

### Building

```bash
# Build admin panel for production
npm run admin:build

# Build Shopify app
npm run app:build
```

### Deployment

```bash
# Deploy Shopify app
npm run app:deploy
```

## File Locations

| What                  | Where                  |
| --------------------- | ---------------------- |
| Shopify dependencies  | `package.json`         |
| Admin panel code      | `admin/`               |
| React components      | `admin/components/`    |
| Vite config           | `admin/vite.config.ts` |
| Theme extensions      | `extensions/`          |
| Environment variables | `.env`                 |
| Shopify app config    | `shopify.app.toml`     |

## Environment Variables

```bash
# Required in .env
VITE_SHOPIFY_CLIENT_ID=your_client_id
VITE_SHOPIFY_API_KEY=your_api_key
VITE_API_URL=http://localhost:3000
```

## TypeScript

- Main config: `tsconfig.json`
- Admin config: `admin/tsconfig.json`
- Vite types: `vite-env.d.ts`

## Ports

- API Server: `3000` (configured in main project)
- Admin Dev Server: `3001` (configured in `admin/vite.config.ts`)

## Project Structure

```
shopify/
├── admin/                  # Admin React app
│   ├── components/        # React components
│   ├── App.tsx           # Main component
│   └── index.tsx         # Entry point
├── extensions/           # Shopify extensions
│   └── cart-upsell/     # Cart extension
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── .env                 # Environment variables
```

## Troubleshooting

### Port already in use

```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Type errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### API not connecting

```bash
# Make sure API is running
cd ../../
npm run api:serve
```

### Clear Vite cache

```bash
# From shopify/admin directory
rm -rf node_modules/.vite
```

## Links

- [Full Setup Guide](./SETUP.md)
- [Migration Notes](./MIGRATION_NOTES.md)
- [Shopify Documentation](./README.md)
- [Shopify Developer Docs](https://shopify.dev/docs)
- [Polaris Design System](https://polaris.shopify.com/)
- [Vite Documentation](https://vitejs.dev/)
