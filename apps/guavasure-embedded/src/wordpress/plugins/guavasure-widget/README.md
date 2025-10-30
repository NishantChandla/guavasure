# Guavasure Pet Insurance WordPress Plugin

A comprehensive WordPress plugin that integrates Guavasure's AI-powered pet insurance with your WordPress/Elementor website. Features Mila, an intelligent conversational assistant that guides users through the entire insurance process.

## 🌟 Features

- **AI Conversational Agent (Mila)**: Natural, friendly chat interface that guides users through pet insurance
- **Complete Purchase Flow**: From quote generation to policy activation
- **Elementor Integration**: Drag-and-drop widget with full customization options
- **Shortcode Support**: Easy integration anywhere on your site
- **Fully Customizable**: Colors, text, and styling options
- **Mobile Responsive**: Works perfectly on all devices
- **Same Backend as Shopify**: Uses the same API endpoints for consistency

## 📦 Installation

### Method 1: Manual Installation

1. Download the plugin folder
2. Upload it to `/wp-content/plugins/guavasure-widget/`
3. Activate the plugin through the 'Plugins' menu in WordPress
4. Configure the API base URL in `plugin.php` (line 26)

### Method 2: Upload ZIP

1. Create a ZIP file of the plugin folder
2. Go to WordPress Admin → Plugins → Add New → Upload Plugin
3. Upload the ZIP file and activate
4. Configure the API base URL

## 🚀 Usage

### Using with Elementor (Recommended)

1. Open a page in Elementor editor
2. Search for "Guavasure Pet Insurance" widget in the widget panel
3. Drag and drop it onto your page
4. Customize settings in the sidebar:
   - **Banner Settings**: Title, subtitle, button text, icon
   - **Colors**: Primary, secondary, text, and button colors

### Using Shortcode

Add this shortcode anywhere on your site:

```
[guavasure_insurance]
```

#### Shortcode with Custom Attributes:

```
[guavasure_insurance
    title="🐶 Protect Your Pet"
    subtitle="Get instant quotes in minutes"
    button_text="Start Now"
    primary_color="#FF6B6B"
    secondary_color="#4ECDC4"
]
```

#### Available Shortcode Attributes:

| Attribute           | Default                              | Description              |
| ------------------- | ------------------------------------ | ------------------------ |
| `title`             | "🛡️ Protect Your Pet Today"          | Banner main title        |
| `subtitle`          | "Get comprehensive pet insurance..." | Banner subtitle          |
| `button_text`       | "Get Instant Quote"                  | CTA button text          |
| `icon`              | "🐾"                                 | Banner icon (emoji)      |
| `show_icon`         | "yes"                                | Show/hide icon (yes/no)  |
| `primary_color`     | "#4A90E2"                            | Primary gradient color   |
| `secondary_color`   | "#50E3C2"                            | Secondary gradient color |
| `text_color`        | "#FFFFFF"                            | Text color               |
| `button_color`      | "#FFFFFF"                            | Button background        |
| `button_text_color` | "#4A90E2"                            | Button text color        |

## 🤖 How Mila Works

Mila guides users through a conversational flow:

1. **Pet Information**: Name, type (dog/cat), breed, age, weight
2. **Location**: PIN code for regional pricing
3. **Health Status**: Current health and vaccination status
4. **Quote Generation**: Real-time quote with monthly/annual options
5. **Customer Details**: Name, address, PAN card
6. **Payment Processing**: Secure payment completion
7. **Policy Activation**: Instant policy documents

## 🔧 Configuration

### API Configuration

Edit `plugin.php` and update the API base URL:

```php
wp_localize_script('guavasure-main', 'guavasureConfig', array(
    'apiBase' => 'https://your-api-domain.com', // Update this
    'siteUrl' => get_site_url(),
));
```

### Required Backend Endpoints

The plugin requires these API endpoints (same as Shopify version):

- `POST /api/quote` - Generate insurance quote
- `POST /api/checkout` - Create checkout session
- `POST /api/checkout/complete` - Complete payment and create policy

## 🎨 Customization

### CSS Customization

Add custom CSS in your theme's `style.css` or via WordPress Customizer:

```css
/* Customize banner */
.guavasure-insurance-banner {
  border-radius: 12px !important;
  padding: 30px !important;
}

/* Customize button */
.guavasure-cta-button {
  font-size: 18px !important;
}

/* Customize modal */
.guavasure-modal-content {
  max-width: 700px !important;
}
```

### JavaScript Customization

You can access the Guavasure object in your theme's JavaScript:

```javascript
// Open modal programmatically
GuavasureInsurance.openModal();

// Close modal
GuavasureInsurance.closeModal();
```

## 📱 Mobile Responsive

The plugin is fully responsive and adapts to all screen sizes:

- **Desktop**: Full modal with side-by-side layout
- **Tablet**: Adjusted spacing and sizing
- **Mobile**: Full-screen modal with optimized touch interactions

## 🔐 Security

- All user inputs are sanitized and validated
- XSS protection via `esc_attr()` and `esc_html()`
- CSRF protection via WordPress nonces
- Secure API communication over HTTPS

## 🆚 Comparison with Shopify Extension

| Feature             | WordPress Plugin         | Shopify Extension |
| ------------------- | ------------------------ | ----------------- |
| AI Agent (Mila)     | ✅                       | ✅                |
| Conversational Flow | ✅                       | ✅                |
| Backend API         | ✅ Same                  | ✅ Same           |
| Customization       | ✅ Elementor + Shortcode | ✅ Theme Editor   |
| Installation        | Plugin                   | Theme Extension   |

## 🐛 Troubleshooting

### Modal Not Opening

1. Check browser console for JavaScript errors
2. Ensure `main.js` is loaded correctly
3. Check if there are conflicting JavaScript libraries

### Styling Issues

1. Check for theme CSS conflicts
2. Increase CSS specificity if needed
3. Use `!important` flag as last resort

### API Connection Issues

1. Verify API base URL is correct
2. Check CORS settings on your API server
3. Ensure API endpoints are accessible
4. Check browser network tab for errors

## 📝 File Structure

```
guavasure-widget/
├── assets/
│   ├── main.js           # Conversational AI logic (Mila)
│   └── main.css          # Modal and banner styles
├── includes/
│   └── class-elementor-widget.php  # Elementor widget class
├── plugin.php            # Main plugin file
└── README.md             # This file
```

## 🔄 Updates

### Version 1.0.0

- Initial release
- AI conversational agent (Mila)
- Complete purchase flow
- Elementor integration
- Shortcode support
- Full customization options

## 💡 Tips

1. **Use Elementor**: For the best editing experience, use the Elementor widget
2. **Test Mobile**: Always test the modal on mobile devices
3. **Customize Colors**: Match your brand colors for consistency
4. **Monitor API**: Keep an eye on API response times
5. **Update API URL**: Change from localhost to production URL before going live

## 📞 Support

For support and questions:

- Website: https://guavasure.com
- Email: support@guavasure.com

## 📄 License

GPL2+ License - Free to use and modify

## 🤝 Credits

- Plugin developed by Guavasure
- AI Agent "Mila" conversational design
- Compatible with WordPress 5.0+ and Elementor 3.0+

---

**Note**: This plugin uses the same backend API as the Shopify extension, ensuring consistency across platforms.
