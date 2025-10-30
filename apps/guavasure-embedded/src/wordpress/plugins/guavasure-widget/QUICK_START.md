# Quick Start Guide - Guavasure Pet Insurance WordPress Plugin

Get up and running with Guavasure Pet Insurance in 5 minutes!

## 🚀 Quick Installation

### Step 1: Upload Plugin

1. Download the `guavasure-widget` folder
2. Upload to `/wp-content/plugins/guavasure-widget/`
3. Go to WordPress Admin → Plugins
4. Activate "Guavasure Pet Insurance"

### Step 2: Configure API (Important!)

Edit `plugin.php` line 26:

```php
'apiBase' => 'https://your-api-domain.com', // Change from localhost!
```

### Step 3: Add to Your Site

#### Option A: Using Elementor (Recommended)

1. Edit any page with Elementor
2. Search for "Guavasure" in widgets panel
3. Drag "Guavasure Pet Insurance" to your page
4. Customize in sidebar → Save

#### Option B: Using Shortcode

Add this to any post/page:

```
[guavasure_insurance]
```

### Step 4: Test!

1. View your page
2. Click "Get Instant Quote"
3. Follow Mila's conversation
4. Complete a test purchase

## ✨ Quick Customization

### Change Colors (Shortcode)

```
[guavasure_insurance
    primary_color="#FF6B6B"
    secondary_color="#4ECDC4"
]
```

### Change Text (Shortcode)

```
[guavasure_insurance
    title="Insure Your Furry Friend"
    subtitle="Quick quotes, great coverage"
    button_text="Start Now"
]
```

### Change Everything (Shortcode)

```
[guavasure_insurance
    title="🐕 Pet Protection Plans"
    subtitle="Coverage starts at ₹299/month"
    button_text="Get Protected"
    icon="🛡️"
    primary_color="#667eea"
    secondary_color="#764ba2"
    button_color="#f093fb"
    button_text_color="#ffffff"
]
```

## 🎨 Using with Elementor

### Customization Options

**Banner Settings Tab:**

- Enable/Disable Banner
- Banner Title (with emoji support)
- Banner Subtitle
- Button Text
- Show/Hide Icon
- Custom Icon

**Colors Tab:**

- Primary Color (gradient start)
- Secondary Color (gradient end)
- Text Color
- Button Background Color
- Button Text Color

**Pro Tip**: Use color picker to match your brand perfectly!

## 🔧 Common Customizations

### Full Width Banner

Add to your theme's CSS:

```css
.guavasure-insurance-banner {
  border-radius: 0 !important;
  margin: 0 -15px !important;
}
```

### Larger Button

```css
.guavasure-cta-button {
  padding: 18px 36px !important;
  font-size: 18px !important;
}
```

### Different Modal Width

```css
.guavasure-modal-content {
  max-width: 800px !important;
}
```

## 🐛 Troubleshooting

### Modal Not Opening?

**Check**: Browser console (F12) for errors
**Fix**: Clear cache and reload page

### Wrong Colors?

**Check**: CSS conflicts from theme
**Fix**: Use `!important` in custom CSS

### API Errors?

**Check**: API URL in `plugin.php`
**Fix**: Ensure API is running and accessible

## 📱 Mobile Testing

Test on different devices:

```
Desktop: Chrome, Firefox, Safari
Tablet: iPad, Android tablet
Mobile: iPhone, Android phone
```

The modal automatically adapts to screen size!

## 🎯 Next Steps

1. ✅ Install and activate plugin
2. ✅ Configure API URL
3. ✅ Add to homepage
4. ✅ Customize colors to match brand
5. ✅ Test full conversation flow
6. ✅ Test on mobile devices
7. ✅ Monitor analytics
8. ✅ Collect feedback

## 💡 Pro Tips

1. **Use Elementor**: Best editing experience with live preview
2. **Test Locally First**: Use localhost API for testing
3. **Match Your Brand**: Customize colors to fit your site
4. **Add Multiple Banners**: Use shortcode on different pages with different text
5. **Track Conversions**: Monitor how many users complete the flow

## 🆘 Need Help?

- **Documentation**: See README.md for full details
- **Support**: support@guavasure.com
- **Website**: https://guavasure.com

## 🎉 Success Checklist

- [ ] Plugin activated
- [ ] API URL configured (not localhost)
- [ ] Banner visible on site
- [ ] Modal opens on button click
- [ ] Mila appears and greets user
- [ ] Can complete full conversation
- [ ] Quote generates successfully
- [ ] Checkout flow works
- [ ] Policy created successfully
- [ ] Looks good on mobile
- [ ] Colors match brand

**All checked?** You're ready to go live! 🚀

---

## 🔥 Example Implementations

### E-commerce Pet Store

```
[guavasure_insurance
    title="🐾 Protect What You Love"
    subtitle="Insurance for pets you just adopted"
    button_text="Insure My New Pet"
    primary_color="#FF6B6B"
    secondary_color="#FFD93D"
]
```

### Veterinary Clinic

```
[guavasure_insurance
    title="🏥 Recommended by Vets"
    subtitle="Comprehensive coverage for your patients"
    button_text="Learn More"
    primary_color="#6C5CE7"
    secondary_color="#A29BFE"
]
```

### Pet Blog/Community

```
[guavasure_insurance
    title="💚 Trusted by Pet Lovers"
    subtitle="Join 10,000+ happy pet parents"
    button_text="Join Now"
    primary_color="#00B894"
    secondary_color="#00CEC9"
]
```

---

**Ready to protect more pets?** Start using Guavasure today! 🐕🐈
