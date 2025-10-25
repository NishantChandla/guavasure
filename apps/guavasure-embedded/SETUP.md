# Guavasure Embedded - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# From workspace root
npm install

# Or from app directory
cd apps/guavasure-embedded
npm install
```

### 2. Configure Shopify App

1. Go to [Shopify Partner Dashboard](https://partners.shopify.com/)
2. Create a new app or select existing one
3. Copy your API credentials

### 3. Set Environment Variables

Copy the example environment file:

```bash
cp apps/guavasure-embedded/env.example apps/guavasure-embedded/.env
```

Update `.env` with your values:

```bash
SHOPIFY_CLIENT_ID=your_actual_api_key
SHOPIFY_API_SECRET=your_actual_api_secret
HOST=your-ngrok-url.io  # or localhost:3000 for local dev
```

### 4. Update Shopify Configuration

Edit `apps/guavasure-embedded/shopify.app.toml`:

```toml
client_id = "your_actual_api_key"
application_url = "https://your-ngrok-url.io"
dev_store_url = "yourdevstore.myshopify.com"
```

### 5. Build the Backend

```bash
# From workspace root
nx build guavasure-embedded

# Or
npm run build
```

### 6. Start Development Server

```bash
# Terminal 1: Start backend
nx serve guavasure-embedded

# Terminal 2: Start frontend (optional, for admin UI)
cd apps/guavasure-embedded
npm run dev:frontend
```

### 7. Expose Local Server (Development)

Use ngrok to expose your local server:

```bash
ngrok http 3000
```

Copy the ngrok URL and update:

- `.env` → `HOST=your-ngrok-url.ngrok.io`
- `shopify.app.toml` → `application_url = "https://your-ngrok-url.ngrok.io"`

### 8. Install App on Development Store

1. Open your browser: `https://your-ngrok-url.ngrok.io/api/auth/shopify?shop=yourdevstore.myshopify.com`
2. Authorize the app
3. You'll be redirected to the admin UI

### 9. Deploy Extension

```bash
# From app directory
cd apps/guavasure-embedded

# Push extension to Shopify
shopify app extension push

# Or using nx
nx run guavasure-embedded:build-extension
```

### 10. Add Banner to Cart

1. Go to Shopify Admin → Online Store → Themes
2. Click "Customize"
3. Navigate to Cart page
4. Add "Pet Insurance Banner" app block
5. Configure settings (text, colors, etc.)
6. Save

## 📁 Project Structure

```
apps/guavasure-embedded/
├── src/
│   ├── api/                      # Express backend
│   │   ├── server.ts             # Main server
│   │   ├── shopify.ts            # Shopify config
│   │   └── routes/               # API routes
│   ├── frontend/                 # React admin UI
│   │   ├── components/           # React components
│   │   └── vite.config.ts        # Vite config
│   └── extensions/               # Shopify extensions
│       └── cart-upsell/          # Cart banner extension
├── shopify.app.toml              # Shopify app config
├── project.json                  # Nx project config
├── package.json                  # Dependencies
└── env.example                   # Environment variables template
```

## 🧪 Testing the Flow

1. **Test Backend:**

```bash
curl http://localhost:3000/api/health
```

2. **Test Quote API:**

```bash
curl -X POST http://localhost:3000/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "petName": "Max",
    "breed": "Golden Retriever",
    "age": 5,
    "weight": 60,
    "isVaccinated": true,
    "isHealthyNow": true
  }'
```

3. **Test Frontend:**
   Open `http://localhost:3001` (if running frontend dev server)

4. **Test Extension:**

- Add items to cart on your dev store
- Go to cart page
- Insurance banner should appear
- Click "Get Quote"
- Fill form and submit

## 🔧 Nx Commands

```bash
# Build backend
nx build guavasure-embedded

# Serve backend (watch mode)
nx serve guavasure-embedded

# Build frontend
nx run guavasure-embedded:build-frontend

# Serve frontend
nx run guavasure-embedded:serve-frontend

# Build extension
nx run guavasure-embedded:build-extension

# Deploy extension
nx run guavasure-embedded:deploy-extension
```

## 🐛 Troubleshooting

### OAuth Error

- Verify API key and secret in `.env`
- Check redirect URLs in Shopify Partner Dashboard
- Ensure ngrok URL matches in all configs

### Extension Not Showing

- Confirm extension is pushed: `shopify app extension list`
- Check theme customization settings
- Verify banner is enabled in admin UI

### API Errors

- Check server logs
- Verify all environment variables are set
- Ensure dependencies are installed

### CORS Issues

- Update CORS settings in `server.ts`
- Add your domain to allowed origins

## 📦 Production Deployment

### Backend Deployment (Railway/Heroku)

1. **Deploy to Railway:**

```bash
railway login
railway init
railway up
```

2. **Set Environment Variables:**

- Add all variables from `.env` in Railway dashboard
- Update `HOST` to your production URL

3. **Update Shopify Config:**

- Update `shopify.app.toml` with production URL
- Update redirect URLs in Shopify Partner Dashboard

### Frontend Deployment

Option 1: Serve from Express

- Build frontend: `npm run build:frontend`
- Serve static files from Express

Option 2: Deploy to CDN

- Build frontend
- Upload to Cloudflare Pages, Vercel, or Netlify
- Update CORS settings in backend

### Extension Deployment

```bash
shopify app extension deploy
```

Then submit for review in Shopify Partner Dashboard.

## 🔐 Security Checklist

- [ ] Use HTTPS in production
- [ ] Store secrets in environment variables
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Use database for session storage (not in-memory)
- [ ] Enable CSRF protection
- [ ] Verify webhook HMAC signatures
- [ ] Add logging and monitoring
- [ ] Implement error tracking (Sentry)

## 📚 Additional Resources

- [Shopify App Development Docs](https://shopify.dev/docs/apps)
- [Shopify Theme Extensions](https://shopify.dev/docs/apps/online-store/theme-app-extensions)
- [Shopify API Reference](https://shopify.dev/api)
- [Nx Documentation](https://nx.dev)

## 💬 Support

If you encounter issues:

1. Check server logs: `nx serve guavasure-embedded`
2. Verify all environment variables are set
3. Review Shopify Partner Dashboard logs
4. Check ngrok tunnel is running

For additional help, contact: support@guavasure.com
