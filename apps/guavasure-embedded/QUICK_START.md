# Quick Start Guide - 5 Minutes to Running App

## 🚀 Prerequisites

- Node.js 18+ installed
- Shopify Partner account
- Development store

## ⚡ Steps

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Configure Environment (1 min)

```bash
# Copy environment template
cp apps/guavasure-embedded/env.example apps/guavasure-embedded/.env

# Edit .env and add your Shopify API credentials
SHOPIFY_CLIENT_ID=your_key_here
SHOPIFY_API_SECRET=your_secret_here
HOST=localhost:3000
```

### 3. Update Shopify Config (30 sec)

Edit `apps/guavasure-embedded/shopify.app.toml`:

```toml
client_id = "your_SHOPIFY_CLIENT_ID"
dev_store_url = "yourdevstore.myshopify.com"
```

### 4. Build & Run (1 min)

```bash
# Build
nx build guavasure-embedded

# Start server
nx serve guavasure-embedded
```

Server running at: http://localhost:3000

### 5. Test API (30 sec)

```bash
# Health check
curl http://localhost:3000/api/health

# Test quote
curl -X POST http://localhost:3000/api/quote \
  -H "Content-Type: application/json" \
  -d '{"petName":"Max","breed":"Golden Retriever","age":5,"weight":60,"isVaccinated":true,"isHealthyNow":true}'
```

### 6. Expose with ngrok (1 min)

```bash
ngrok http 3000
# Copy the https URL (e.g., https://abc123.ngrok.io)

# Update .env
HOST=abc123.ngrok.io

# Update shopify.app.toml
application_url = "https://abc123.ngrok.io"
```

### 7. Install App (1 min)

Visit: `https://abc123.ngrok.io/api/auth/shopify?shop=yourdevstore.myshopify.com`

Authorize the app → You're done!

## 📦 What You Get

✅ **Backend API** running on port 3000

- Auth: `/api/auth/*`
- Quote: `/api/quote`
- Checkout: `/api/checkout`
- Settings: `/api/settings`
- Webhooks: `/api/webhooks/*`

✅ **Admin UI** (optional, separate dev server)

```bash
cd apps/guavasure-embedded
npm run dev:frontend
# Runs on port 3001
```

✅ **Cart Extension** ready to deploy

```bash
shopify app extension push
```

## 🧪 Test the Flow

1. Add items to cart on dev store
2. Go to cart page
3. Customize theme → Add "Pet Insurance Banner"
4. Click banner → Fill form → Get quote
5. See premium calculation → Proceed to checkout

## 📝 Next Steps

- Read [SETUP.md](./SETUP.md) for detailed instructions
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Customize banner in admin UI
- Deploy extension to store theme

## 🐛 Common Issues

**Port 3000 already in use?**

```bash
# Change PORT in .env
PORT=3001
```

**OAuth errors?**

- Verify API key/secret match Shopify Partner Dashboard
- Check redirect URLs are configured
- Ensure ngrok URL is updated everywhere

**Extension not showing?**

- Push extension: `shopify app extension push`
- Add block in theme customizer
- Enable banner in admin UI

## 📞 Need Help?

- Check logs: `nx serve guavasure-embedded`
- Review [README.md](./README.md)
- Contact: support@guavasure.com

---

**Total Setup Time: ~5 minutes** ⏱️
