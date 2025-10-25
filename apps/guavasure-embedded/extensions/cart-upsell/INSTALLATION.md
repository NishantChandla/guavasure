# Installation Guide

This guide will walk you through installing and configuring the Guavasure Pet Insurance Extension for your Shopify store.

## Prerequisites

- Shopify store with a compatible theme (Online Store 2.0)
- Guavasure merchant account
- Admin access to your Shopify store

## Installation Steps

### 1. Deploy the Extension

#### Via Shopify CLI

```bash
# Navigate to your app directory
cd apps/guavasure-embedded

# Deploy the extension
shopify app deploy

# Follow the prompts to select your app
```

#### Via Shopify Partner Dashboard

1. Go to your Partner Dashboard
2. Select your app
3. Navigate to Extensions
4. Click "Create extension"
5. Upload the extension files

### 2. Add Block to Theme

1. **Navigate to Theme Editor**

   - Go to Online Store → Themes
   - Click "Customize" on your active theme

2. **Access Cart Page**

   - Use the page selector dropdown
   - Select "Cart" page

3. **Add the Extension Block**

   - Click "Add block" in the appropriate section
   - Look for "Pet Insurance Banner" under Apps
   - Click to add it to your cart page

4. **Position the Block**

   - Drag the block to your desired position:
     - Above checkout button (recommended)
     - Below cart items
     - Top of cart page

5. **Save Changes**
   - Click "Save" in the top-right corner

### 3. Configure Extension Settings

#### In Theme Editor

1. **Select the Insurance Banner Block**

   - Click on the "Pet Insurance Banner" block

2. **Configure Basic Settings**

   ```
   Banner Settings:
   ✓ Enable Banner: ON
   ✓ Banner Title: "Protect Your Pet Today"
   ✓ Banner Subtitle: "Get comprehensive pet insurance coverage in minutes"
   ✓ Button Text: "Get Instant Quote"
   ```

3. **Customize Icon**

   ```
   Icon Settings:
   ✓ Show Icon: ON
   ✓ Banner Icon: 🐾 (or your preferred emoji)
   ```

4. **Set Colors**

   ```
   Color Customization:
   ✓ Primary Color: #4A90E2 (or match your brand)
   ✓ Secondary Color: #50E3C2 (or match your brand)
   ✓ Text Color: #FFFFFF
   ✓ Button Color: #FFFFFF
   ✓ Button Text Color: #4A90E2
   ```

5. **Adjust Spacing**

   ```
   Spacing & Size:
   ✓ Banner Padding: 20px
   ✓ Banner Margin: 16px
   ✓ Border Radius: 8px
   ✓ Button Border Radius: 6px
   ```

6. **Fine-tune Typography**
   ```
   Typography:
   ✓ Title Font Size: 20px
   ✓ Subtitle Font Size: 14px
   ✓ Button Font Size: 16px
   ```

#### In Guavasure Admin Panel

1. **Access Settings**

   - Open the Guavasure app from your Shopify admin
   - Navigate to Settings

2. **Configure Commission**

   ```
   Commission & Pricing:
   ✓ Commission Percentage: 10% (adjust as needed)
   ```

3. **Set Display Options**

   ```
   Display Options:
   ✓ Show on cart page: ON
   ✓ Show on checkout page: OFF (optional)
   ```

4. **Review Preview**

   - Check the live preview in the admin panel
   - Verify it matches your expectations

5. **Save Settings**
   - Click "Save" to apply changes

### 4. Test the Installation

1. **Visit Your Store**

   - Open your store in a new tab
   - Add any product to cart
   - Go to the cart page

2. **Verify Banner Appearance**

   - ✓ Banner is visible
   - ✓ Colors match your settings
   - ✓ Icon displays correctly
   - ✓ Text is readable

3. **Test the Modal Flow**

   **Step 1: Pet Details**

   - Click "Get Instant Quote"
   - Fill in pet information:
     ```
     Pet Name: Max
     Pet Type: Dog
     Breed: Golden Retriever
     Age: 3
     Weight: 45
     ✓ Vaccinated
     ✓ Healthy
     ```
   - Click "Get My Quote"

   **Step 2: Quote Display**

   - ✓ Quote loads successfully
   - ✓ Pricing displays correctly
   - ✓ Coverage details are visible
   - Choose a plan (monthly or annual)

   **Step 3: Payment**

   - ✓ Payment form displays
   - ✓ Order summary is correct
   - Enter test payment details:
     ```
     Email: test@example.com
     Card: 4242 4242 4242 4242
     Expiry: 12/25
     CVV: 123
     ✓ Agree to terms
     ```
   - Click "Complete Purchase"

   **Step 4: Policy**

   - ✓ Success screen displays
   - ✓ Policy details are shown
   - ✓ Download button works
   - ✓ Email button works

4. **Test Responsiveness**
   - Test on desktop
   - Test on tablet
   - Test on mobile
   - Verify modal closes with ESC key
   - Verify modal closes when clicking outside

### 5. Optional: Add Triggers in Other Locations

You can add insurance triggers in other parts of your theme:

#### Product Pages

Add to `sections/product-template.liquid`:

```liquid
{% render 'insurance-trigger',
  button_text: 'Insure Your Pet',
  show_as: 'button'
%}
```

#### Collection Pages

Add to `sections/collection-template.liquid`:

```liquid
<div style="text-align: center; margin: 20px 0;">
  {% render 'insurance-trigger',
    button_text: 'Protect Your Purchases',
    show_as: 'link'
  %}
</div>
```

#### Thank You Page

Add to `checkout.liquid` or theme settings:

```liquid
{% if shop.metafields.guavasure.enabled %}
  <div class="post-purchase-insurance">
    <h3>Don't Forget Pet Insurance!</h3>
    {% render 'insurance-trigger',
      button_text: 'Add Insurance Now',
      show_as: 'button'
    %}
  </div>
{% endif %}
```

## Troubleshooting

### Issue: Banner Not Showing

**Solution:**

1. Verify extension is published:
   ```bash
   shopify app deploy
   ```
2. Check theme editor: Block should be visible in cart template
3. Ensure "Enable Banner" is ON in settings
4. Clear browser cache and reload

### Issue: Modal Not Opening

**Solution:**

1. Check browser console for errors (F12)
2. Verify `insurance-modal.js` is loading:
   - Open Network tab
   - Look for `insurance-modal.js`
   - Should return 200 status
3. Disable browser extensions that might block JavaScript
4. Try in incognito mode

### Issue: Quote API Failing

**Solution:**

1. Verify API endpoint is configured:
   - Check `shopify.app.toml`
   - Ensure HOST environment variable is set
2. Check backend server is running:
   ```bash
   npm run dev
   ```
3. Review API logs for errors
4. Test API directly:
   ```bash
   curl -X POST http://localhost:3000/api/quote \
     -H "Content-Type: application/json" \
     -d '{"petName":"Max","breed":"Golden Retriever","age":3,"weight":45}'
   ```

### Issue: Styling Issues

**Solution:**

1. Verify `insurance-modal.css` is loading
2. Check for CSS conflicts with theme
3. Increase specificity of selectors if needed:
   ```css
   .guavasure-modal .guavasure-modal-content {
     /* Your overrides */
   }
   ```
4. Clear theme cache:
   - Theme Editor → Actions → Clear cache

### Issue: Mobile Display Problems

**Solution:**

1. Test on actual devices, not just browser emulation
2. Check viewport meta tag in theme.liquid:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   ```
3. Verify responsive breakpoints in CSS
4. Reduce modal width for mobile in settings

## Post-Installation Checklist

- [ ] Extension deployed and published
- [ ] Block added to cart page
- [ ] Settings configured in theme editor
- [ ] Admin panel settings saved
- [ ] Test purchase completed successfully
- [ ] Mobile responsiveness verified
- [ ] Analytics tracking set up (optional)
- [ ] Team trained on how to use extension
- [ ] Documentation shared with relevant stakeholders

## Support

If you encounter issues not covered in this guide:

1. **Check Documentation**: Review README.md for detailed information
2. **Check Logs**: Review browser console and server logs
3. **Contact Support**:
   - Email: support@guavasure.com
   - Include: Store URL, error messages, screenshots
4. **Community**: Join our Slack community for peer support

## Next Steps

- [ ] Set up analytics tracking
- [ ] Configure email templates for policies
- [ ] Customize locale files for multiple languages
- [ ] A/B test different banner positions
- [ ] Review conversion metrics weekly
- [ ] Gather customer feedback
- [ ] Plan promotional campaigns

---

**Congratulations! Your pet insurance extension is now live!** 🎉

Start tracking your conversions and optimizing for better results.
