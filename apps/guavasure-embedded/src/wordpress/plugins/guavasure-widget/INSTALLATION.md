# Installation Guide - Guavasure Pet Insurance WordPress Plugin

Complete installation and deployment guide for the Guavasure Pet Insurance WordPress plugin.

---

## 📋 Prerequisites

- WordPress 5.0 or higher
- PHP 7.2 or higher
- Modern web browser
- Access to WordPress admin panel
- (Optional) Elementor 3.0+ for widget support

---

## 📦 Package Structure

Before installation, ensure you have the complete plugin structure:

```
guavasure-widget/
├── assets/
│   ├── main.js           (1,227 lines - AI logic)
│   └── main.css          (687 lines - Styling)
├── includes/
│   └── class-elementor-widget.php  (274 lines - Elementor)
├── plugin.php            (177 lines - Main plugin)
├── README.md             (Documentation)
├── QUICK_START.md        (Quick guide)
└── INSTALLATION.md       (This file)
```

---

## 🚀 Installation Methods

### Method 1: Manual Upload (Recommended for Development)

#### Step 1: Prepare Plugin

```bash
# Navigate to your plugins directory
cd /path/to/wordpress/wp-content/plugins/

# Copy the plugin folder
cp -r /path/to/guavasure-widget ./guavasure-widget/
```

#### Step 2: Set Permissions

```bash
# Set proper permissions
chmod -R 755 guavasure-widget/
chown -R www-data:www-data guavasure-widget/
```

#### Step 3: Activate Plugin

1. Log into WordPress Admin
2. Go to **Plugins** → **Installed Plugins**
3. Find "Guavasure Pet Insurance"
4. Click **Activate**

---

### Method 2: ZIP Upload (Recommended for Clients)

#### Step 1: Create ZIP File

**On macOS/Linux:**

```bash
cd /path/to/plugins/
zip -r guavasure-widget.zip guavasure-widget/ \
  -x "*.DS_Store" "*.git*" "*node_modules*"
```

**On Windows:**

```powershell
Compress-Archive -Path guavasure-widget -DestinationPath guavasure-widget.zip
```

**ZIP Contents Checklist:**

- [ ] `assets/main.js`
- [ ] `assets/main.css`
- [ ] `includes/class-elementor-widget.php`
- [ ] `plugin.php`
- [ ] `README.md`

#### Step 2: Upload via WordPress Admin

1. Go to **Plugins** → **Add New**
2. Click **Upload Plugin**
3. Choose `guavasure-widget.zip`
4. Click **Install Now**
5. Click **Activate Plugin**

---

### Method 3: FTP Upload

#### Step 1: Connect via FTP

```
Host: your-website.com
Username: your-ftp-username
Password: your-ftp-password
Port: 21 (or 22 for SFTP)
```

#### Step 2: Navigate to Plugins Directory

```
/public_html/wp-content/plugins/
```

#### Step 3: Upload Plugin

1. Upload entire `guavasure-widget/` folder
2. Ensure all files uploaded successfully
3. Check file permissions (755 for folders, 644 for files)

#### Step 4: Activate in WordPress

1. Go to WordPress Admin → **Plugins**
2. Find "Guavasure Pet Insurance"
3. Click **Activate**

---

## ⚙️ Configuration

### Step 1: Configure API URL (CRITICAL!)

Edit `plugin.php` around line 26:

**Before (Development):**

```php
wp_localize_script('guavasure-main', 'guavasureConfig', array(
    'apiBase' => 'http://localhost:3000', // ❌ Don't use in production!
    'siteUrl' => get_site_url(),
));
```

**After (Production):**

```php
wp_localize_script('guavasure-main', 'guavasureConfig', array(
    'apiBase' => 'https://api.guavasure.com', // ✅ Production API
    'siteUrl' => get_site_url(),
));
```

### Step 2: Verify Assets Are Loading

1. View any page on your site
2. Open Browser DevTools (F12)
3. Go to **Network** tab
4. Refresh page
5. Check for:
   - ✅ `main.js` loaded (Status 200)
   - ✅ `main.css` loaded (Status 200)
   - ✅ No 404 errors

---

## 🎨 Add to Your Site

### Option A: Using Elementor (Best for Visual Editing)

#### Step 1: Install Elementor (if not already installed)

1. Go to **Plugins** → **Add New**
2. Search "Elementor"
3. Install and activate "Elementor Website Builder"

#### Step 2: Add Widget to Page

1. Edit any page with Elementor
2. In the left panel, search "Guavasure"
3. Drag **Guavasure Pet Insurance** widget to your page
4. Widget appears with default settings

#### Step 3: Customize Widget

In the left sidebar, you'll see:

**Banner Settings:**

- Enable Banner (toggle)
- Banner Title
- Banner Subtitle
- Button Text
- Show Icon
- Banner Icon

**Colors:**

- Primary Color
- Secondary Color
- Text Color
- Button Background
- Button Text Color

#### Step 4: Preview & Publish

1. Click **Preview** to test
2. Click the button to test modal
3. Complete conversation with Mila
4. Click **Publish** when satisfied

---

### Option B: Using Shortcode (Best for Flexibility)

#### Basic Usage

Add to any post or page:

```
[guavasure_insurance]
```

#### With Custom Text

```
[guavasure_insurance
    title="Protect Your Pet Today"
    subtitle="Get instant quotes"
    button_text="Get Started"
]
```

#### With Custom Colors

```
[guavasure_insurance
    primary_color="#667eea"
    secondary_color="#764ba2"
    button_color="#f093fb"
]
```

#### Full Customization

```
[guavasure_insurance
    title="🐕 Pet Insurance Plans"
    subtitle="Starting at ₹299/month"
    button_text="Get Protected"
    icon="🛡️"
    show_icon="yes"
    primary_color="#FF6B6B"
    secondary_color="#4ECDC4"
    text_color="#FFFFFF"
    button_color="#FFFFFF"
    button_text_color="#4A90E2"
]
```

#### Add to PHP Template

```php
<?php echo do_shortcode('[guavasure_insurance]'); ?>
```

---

## 🧪 Testing Installation

### Test Checklist

#### 1. Plugin Activation

- [ ] Plugin appears in plugins list
- [ ] No errors on activation
- [ ] Admin notice shows (if Elementor not installed)

#### 2. Assets Loading

- [ ] `main.js` loads without errors
- [ ] `main.css` loads without errors
- [ ] No console errors in browser
- [ ] GuavasureInsurance object exists (`typeof GuavasureInsurance !== 'undefined'`)

#### 3. Banner Display

- [ ] Banner visible on page
- [ ] Colors applied correctly
- [ ] Text displays properly
- [ ] Button is clickable
- [ ] Icon shows (if enabled)

#### 4. Modal Functionality

- [ ] Modal opens on button click
- [ ] Mila greeting appears
- [ ] Overlay darkens background
- [ ] Close button works
- [ ] ESC key closes modal
- [ ] Clicking overlay closes modal

#### 5. Conversation Flow

- [ ] Pet name input accepts text
- [ ] Pet type buttons work
- [ ] Breed dropdown populates
- [ ] Age selection works
- [ ] Weight input validates
- [ ] PIN code validates (6 digits)
- [ ] Health status selection works
- [ ] Vaccination selection works

#### 6. API Integration

- [ ] Quote generation succeeds
- [ ] Plan cards display
- [ ] Checkout accepts details
- [ ] Payment processes
- [ ] Policy created successfully

#### 7. Responsive Design

- [ ] Works on desktop (1920x1080)
- [ ] Works on laptop (1366x768)
- [ ] Works on tablet (768x1024)
- [ ] Works on mobile (375x667)
- [ ] Modal scrollable on small screens

#### 8. Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

---

## 🐛 Troubleshooting

### Problem: Plugin Not Showing in List

**Possible Causes:**

- Incorrect folder name
- Missing plugin.php file
- PHP syntax error

**Solution:**

```bash
# Check folder structure
ls -la wp-content/plugins/guavasure-widget/
# Should show: plugin.php, assets/, includes/

# Check for PHP errors
tail -f /path/to/wordpress/debug.log

# Enable WordPress debug mode in wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

---

### Problem: Assets Not Loading (404 Errors)

**Possible Causes:**

- Incorrect file permissions
- Missing asset files
- Plugin path issues

**Solution:**

```bash
# Set correct permissions
chmod 644 wp-content/plugins/guavasure-widget/assets/*
chmod 755 wp-content/plugins/guavasure-widget/assets/

# Verify files exist
ls -la wp-content/plugins/guavasure-widget/assets/
# Should show: main.js, main.css

# Clear WordPress cache
# Go to Admin → Settings → Permalinks → Save Changes
```

---

### Problem: Modal Not Opening

**Possible Causes:**

- JavaScript error
- Theme conflict
- Missing jQuery

**Solution:**

1. Open Browser Console (F12)
2. Look for errors
3. Common fixes:

```javascript
// Check if GuavasureInsurance exists
console.log(typeof GuavasureInsurance);
// Should output: "object"

// Test manually
GuavasureInsurance.openModal();
```

**If theme conflict:**

```php
// Add to functions.php temporarily to test
wp_enqueue_script('guavasure-main',
    plugins_url('assets/main.js', __FILE__),
    array(), // Remove jQuery dependency
    '1.0.0',
    true
);
```

---

### Problem: API Errors

**Possible Causes:**

- Wrong API URL
- API server down
- CORS issues

**Solution:**

```php
// Check API URL in plugin.php
// Should be production URL, not localhost

// Test API manually
curl https://api.guavasure.com/api/quote

// Check browser console for CORS errors
// API must allow requests from your domain
```

---

### Problem: Styling Issues

**Possible Causes:**

- Theme CSS conflicts
- Cache not cleared
- Specificity issues

**Solution:**

```css
/* Add to theme's custom CSS */
/* Increase specificity if needed */
.guavasure-modal-content {
  max-width: 600px !important;
}

/* Force colors */
.guavasure-insurance-banner {
  background: linear-gradient(135deg, #4a90e2, #50e3c2) !important;
}
```

---

## 🔧 Advanced Configuration

### Custom API Endpoint per Environment

```php
// In plugin.php
function guavasure_get_api_url() {
    if (defined('WP_ENVIRONMENT_TYPE')) {
        switch (WP_ENVIRONMENT_TYPE) {
            case 'local':
            case 'development':
                return 'http://localhost:3000';
            case 'staging':
                return 'https://staging-api.guavasure.com';
            case 'production':
            default:
                return 'https://api.guavasure.com';
        }
    }
    return 'https://api.guavasure.com';
}

// Update wp_localize_script call
wp_localize_script('guavasure-main', 'guavasureConfig', array(
    'apiBase' => guavasure_get_api_url(),
    'siteUrl' => get_site_url(),
));
```

### Add Analytics Tracking

```javascript
// In main.js, add tracking to key events
window.GuavasureInsurance = {
  openModal: function () {
    // Track modal open
    if (typeof gtag !== 'undefined') {
      gtag('event', 'open_insurance_modal', {
        event_category: 'engagement',
        event_label: 'Pet Insurance Modal Opened',
      });
    }
    // ... rest of function
  },

  generateQuote: async function () {
    // Track quote generation
    if (typeof gtag !== 'undefined') {
      gtag('event', 'generate_quote', {
        event_category: 'conversion',
        event_label: 'Pet Insurance Quote Generated',
      });
    }
    // ... rest of function
  },
};
```

---

## 📊 Performance Optimization

### Enable Caching

```php
// Add to functions.php
function guavasure_cache_assets() {
    // Cache plugin assets for 1 year
    add_filter('style_loader_tag', function($html, $handle) {
        if ($handle === 'guavasure-style') {
            return str_replace("type='text/css'",
                "type='text/css' data-cache='1year'", $html);
        }
        return $html;
    }, 10, 2);
}
add_action('wp_enqueue_scripts', 'guavasure_cache_assets');
```

### Defer JavaScript Loading

```php
// Add to functions.php
function guavasure_defer_js($tag, $handle) {
    if ('guavasure-main' !== $handle) {
        return $tag;
    }
    return str_replace(' src', ' defer src', $tag);
}
add_filter('script_loader_tag', 'guavasure_defer_js', 10, 2);
```

---

## 🚀 Going Live Checklist

### Pre-Launch

- [ ] Plugin tested on staging site
- [ ] API URL updated to production
- [ ] All assets loading correctly
- [ ] No console errors
- [ ] Complete conversation flow tested
- [ ] Mobile responsiveness verified
- [ ] Browser compatibility checked
- [ ] Analytics tracking added
- [ ] Cache cleared

### Launch

- [ ] Backup WordPress site
- [ ] Install plugin on production
- [ ] Verify API connectivity
- [ ] Test one complete flow
- [ ] Add banner to key pages
- [ ] Monitor error logs
- [ ] Watch analytics

### Post-Launch

- [ ] Monitor conversion rates
- [ ] Track API performance
- [ ] Collect user feedback
- [ ] Fix any reported issues
- [ ] Optimize based on data

---

## 📞 Support

### Documentation

- README.md - Complete documentation
- QUICK_START.md - Quick setup guide
- PLATFORM_COMPARISON.md - Compare with Shopify

### Contact

- **Website**: https://guavasure.com
- **Email**: support@guavasure.com
- **Issues**: Report on GitHub (if applicable)

---

## ✅ Installation Complete!

If you've followed all steps, you should now have:

- ✅ Plugin installed and activated
- ✅ API configured correctly
- ✅ Banner visible on your site
- ✅ Modal working with Mila
- ✅ Full conversation flow functional
- ✅ Ready for production use

**Congratulations! You're ready to start protecting pets!** 🎉🐕🐈
