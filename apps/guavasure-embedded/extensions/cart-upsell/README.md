# Guavasure Pet Insurance Extension

A fully customizable Shopify theme extension that enables merchants to offer pet insurance directly on their cart pages. This extension provides a complete insurance flow from quote generation to policy issuance.

## 🌟 Features

### For Merchants

- **Fully Customizable**: Control every aspect of the banner appearance through admin settings
- **Commission Tracking**: Set your commission rate and track earnings
- **Live Preview**: See changes in real-time before publishing
- **Flexible Placement**: Position the banner where it works best for your store
- **Brand Matching**: Customize colors, text, icons to match your brand

### For Customers

- **Seamless Experience**: Multi-step modal flow without leaving the cart
- **Instant Quotes**: Get personalized insurance quotes in seconds
- **Transparent Pricing**: Clear display of monthly and annual pricing options
- **Secure Checkout**: Protected payment processing
- **Immediate Coverage**: Policy documents issued instantly

## 📦 What's Included

```
cart-upsell/
├── shopify.extension.toml    # Extension configuration
├── blocks/
│   └── insurance-banner.liquid   # Main banner block (customizable via theme editor)
├── assets/
│   ├── insurance-modal.js        # Modal functionality and form handling
│   ├── insurance-modal.css       # Responsive styling
│   └── thumbs-up.png            # Asset example
├── locales/
│   └── en.default.json          # Internationalization strings
└── README.md                    # This file
```

## 🎨 Customization Options

The extension supports extensive customization through the Shopify theme editor:

### Banner Settings

- Enable/disable banner
- Custom title and subtitle
- Call-to-action button text
- Banner position (above checkout, below items, top of cart)

### Icon Settings

- Toggle icon visibility
- Custom emoji or text icon (🐾, 🛡️, 🐶, etc.)

### Color Customization

- Primary color (gradient start)
- Secondary color (gradient end)
- Text color
- Button background color
- Button text color

### Spacing & Typography

- Banner padding (12-40px)
- Banner margin (0-40px)
- Border radius (0-20px)
- Button border radius (0-50px)
- Title font size (14-32px)
- Subtitle font size (12-24px)
- Button font size (12-20px)

## 🚀 User Flow

### Step 1: Pet Details Form

Customer provides essential information:

- Pet's name
- Pet type (Dog, Cat, Other)
- Breed
- Age (in years)
- Weight (in lbs)
- Vaccination status
- Current health status
- Pre-existing conditions (if any)

### Step 2: Quote Display

System generates and displays:

- Monthly premium option
- Annual premium option (with savings badge)
- Comprehensive coverage details:
  - Accident coverage
  - Illness coverage
  - Wellness care
  - Emergency care
- Quote validity period

### Step 3: Payment Processing

Secure checkout with:

- Order summary
- Email collection
- Card details (number, expiry, CVV)
- Terms and conditions agreement
- Secure payment badge

### Step 4: Policy Issuance

Immediate policy activation showing:

- Policy number
- Coverage dates (start and end)
- Transaction ID
- Amount paid
- Download and email options
- Next steps guidance

## 🔌 API Integration

The extension integrates with your backend APIs:

### Quote API

```javascript
POST /api/quote
{
  "petName": "Max",
  "petType": "dog",
  "breed": "Golden Retriever",
  "age": 3,
  "weight": 45,
  "isVaccinated": true,
  "isHealthyNow": true,
  "preExistingDiseases": []
}
```

### Checkout API

```javascript
POST /api/checkout
{
  "quoteId": "QUOTE-1234567890",
  "paymentMethod": "card",
  "billingCycle": "monthly",
  "shop": "your-shop.myshopify.com"
}
```

### Payment Completion API

```javascript
POST /api/checkout/complete
{
  "sessionId": "CHECKOUT-1234567890",
  "paymentToken": "tok_xxxxxxxxxxxx",
  "customerEmail": "customer@example.com"
}
```

## 🎯 Installation

1. **Add Extension to Theme**

   - Navigate to your theme editor
   - Add the "Pet Insurance Banner" block to your cart page
   - Customize settings as needed

2. **Configure Admin Settings**

   - Access the Guavasure admin panel
   - Set your commission rate
   - Customize banner appearance
   - Configure display options

3. **Test the Flow**
   - Add items to cart
   - Click the insurance banner
   - Complete a test insurance purchase

## 📱 Responsive Design

The extension is fully responsive and works seamlessly on:

- Desktop browsers
- Tablets
- Mobile devices

Mobile-specific optimizations:

- Stacked form layouts
- Touch-friendly buttons
- Optimized modal sizing
- Simplified progress indicators

## ♿ Accessibility

Built with accessibility in mind:

- Keyboard navigation support
- Focus indicators on interactive elements
- ARIA labels where appropriate
- High contrast mode support
- Screen reader friendly

## 🔒 Security

- Client-side validation for all form inputs
- Secure payment processing
- No sensitive data stored in browser
- HTTPS-only communication
- XSS protection

## 🌍 Internationalization

Fully translatable through locale files. Current support:

- English (en.default.json)

To add more languages:

1. Copy `en.default.json`
2. Rename to your locale code (e.g., `es.json`)
3. Translate all strings
4. The extension will automatically load the appropriate locale

## 🐛 Troubleshooting

### Banner Not Showing

- Check that `bannerEnabled` is true in settings
- Verify the block is added to your theme
- Ensure the extension is published

### Modal Not Opening

- Check browser console for JavaScript errors
- Verify `insurance-modal.js` is loading correctly
- Clear browser cache and reload

### Quote Generation Fails

- Verify API endpoint is accessible
- Check network tab for failed requests
- Ensure all required fields are provided

### Styling Issues

- Check that `insurance-modal.css` is loading
- Clear browser cache
- Test in incognito mode to rule out extension conflicts

## 🔧 Development

### Testing Locally

```bash
# From the extension directory
shopify theme dev

# Or from the app root
cd apps/guavasure-embedded
npm run dev
```

### Modifying Styles

Edit `assets/insurance-modal.css` to customize:

- Colors and gradients
- Spacing and layout
- Animations and transitions
- Responsive breakpoints

### Updating Form Logic

Edit `assets/insurance-modal.js` to modify:

- Form validation
- API calls
- Step transitions
- Error handling

### Changing Content

Edit `blocks/insurance-banner.liquid` to update:

- Block schema (settings)
- Banner HTML structure
- Default values

## 📊 Analytics & Tracking

Track key metrics:

- Banner impressions
- Click-through rate
- Quote completions
- Purchase conversions
- Average policy value

Integrate with your analytics platform by adding tracking calls in `insurance-modal.js`:

```javascript
// Example: Google Analytics
gtag('event', 'insurance_quote_requested', {
  pet_type: petData.petType,
  pet_age: petData.age,
});
```

## 🚀 Future Enhancements

Planned features:

- [ ] Multi-pet coverage options
- [ ] Policy comparison tool
- [ ] Customer reviews integration
- [ ] SMS notifications
- [ ] Mobile app integration
- [ ] Gift insurance option
- [ ] Referral program
- [ ] Policy renewal reminders

## 📝 Support

For technical support:

- Email: support@guavasure.com
- Documentation: https://docs.guavasure.com
- Issues: File on GitHub repository

## 📄 License

Copyright © 2025 Guavasure. All rights reserved.

---

**Built with ❤️ for pet parents everywhere** 🐾
