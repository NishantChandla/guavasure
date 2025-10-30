<?php
/**
 * Plugin Name: Guavasure Pet Insurance
 * Plugin URI: https://guavasure.com
 * Description: Adds an "Insure Your Pet" banner and modal with AI agent Mila for pet insurance, integrated with Guavasure backend.
 * Version: 1.0.0
 * Author: Guavasure
 * Author URI: https://guavasure.com
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: guavasure
 */

if (!defined('ABSPATH')) exit;

// Enqueue assets
function guavasure_enqueue_scripts() {
    // Enqueue JavaScript (no jQuery dependency - using vanilla JS)
    wp_enqueue_script('guavasure-main', plugins_url('assets/main.js', __FILE__), array(), '1.0.0', true);
    
    // Enqueue CSS
    wp_enqueue_style('guavasure-style', plugins_url('assets/main.css', __FILE__), array(), '1.0.0');

    // Pass config vars to JS
    wp_localize_script('guavasure-main', 'guavasureConfig', array(
        'apiBase' => 'http://localhost:3000', // Change to your API base URL
        'siteUrl' => get_site_url(),
    ));
}
add_action('wp_enqueue_scripts', 'guavasure_enqueue_scripts');

function guavasure_insurance_shortcode($atts) {
    // Parse shortcode attributes
    $atts = shortcode_atts(array(
        'title' => 'Protect Your Pet Today',
        'subtitle' => 'Get comprehensive pet insurance coverage in minutes with personalized quotes',
        'button_text' => 'Get Instant Quote',
        'bg_color' => '#5423E7',
        'text_color' => '#FFFFFF',
        'button_color' => '#FFFFFF',
        'button_text_color' => '#5423E7',
    ), $atts, 'guavasure_insurance');

    $image_url = plugins_url('assets/assets_aaa78dbbf3de43acaa5d259f4ee2e40d_f9a5631f68ed48b09eeac32b110c6783.webp', __FILE__);

    // Start output buffering
    ob_start();
    ?>
    <div class="guavasure-insurance-banner" style="
        background-color: <?php echo esc_attr($atts['bg_color']); ?>;
        color: <?php echo esc_attr($atts['text_color']); ?>;
        border-radius: 12px;
        margin: 24px 0;
        box-shadow: 0 4px 20px rgba(84, 35, 231, 0.15);
        overflow: hidden;
    ">
        <div class="guavasure-banner-wrapper">
            <div class="guavasure-banner-image">
                <img src="<?php echo esc_url($image_url); ?>" alt="Pet Insurance" />
            </div>
            <div class="guavasure-banner-content">
                <div class="guavasure-banner-text">
                    <h3 class="guavasure-banner-title"><?php echo esc_html($atts['title']); ?></h3>
                    <p class="guavasure-banner-subtitle"><?php echo esc_html($atts['subtitle']); ?></p>
                </div>
                <button class="guavasure-cta-button" onclick="GuavasureInsurance.openModal()"><?php echo esc_html($atts['button_text']); ?></button>
            </div>
        </div>
    </div>

    <div id="guavasure-insurance-modal" class="guavasure-modal" style="display: none;">
        <div class="guavasure-modal-overlay" onclick="GuavasureInsurance.closeModal()"></div>
        <div class="guavasure-modal-content">
            <div class="guavasure-chat-header">
                <div class="mila-avatar">🐾</div>
                <div class="mila-info">
                    <div class="mila-name">Mila</div>
                    <div class="mila-status">
                        <span class="status-indicator"></span>
                        <span>Your Pet Insurance Assistant</span>
                    </div>
                </div>
            </div>
            <button class="guavasure-modal-close" onclick="GuavasureInsurance.closeModal()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
            <div id="guavasure-modal-body" class="guavasure-modal-body"></div>
        </div>
    </div>
    <?php

    // Return output cleanly without <p>/<br>
    return shortcode_unautop(ob_get_clean());
}
add_shortcode('guavasure_insurance', 'guavasure_insurance_shortcode');

// Elementor widget support
function guavasure_elementor_register_widget() {
    // Load only if Elementor is active
    if (did_action('elementor/loaded')) {
        require_once __DIR__ . '/includes/class-elementor-widget.php';
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new \Elementor_Widget());
    }
}
add_action('elementor/widgets/widgets_registered', 'guavasure_elementor_register_widget');

// Add admin notice if Elementor is not installed
function guavasure_admin_notice() {
    if (!did_action('elementor/loaded')) {
        ?>
        <div class="notice notice-warning is-dismissible">
            <p><?php _e('Guavasure Pet Insurance: For the best experience, please install and activate Elementor. The plugin will work with shortcodes but Elementor provides a better editing experience.', 'guavasure'); ?></p>
        </div>
        <?php
    }
}
add_action('admin_notices', 'guavasure_admin_notice');