<?php
if (!defined('ABSPATH')) exit;

class Elementor_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'guavasure_insurance';
    }

    public function get_title() {
        return __('Guavasure Pet Insurance', 'guavasure');
    }

    public function get_icon() {
        return 'eicon-heart'; // Elementor built-in icon
    }

    public function get_categories() {
        return ['general'];
    }

    protected function _register_controls() {
        // Banner Settings Section
        $this->start_controls_section(
            'banner_section',
            [
                'label' => __('Banner Settings', 'guavasure'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'banner_enabled',
            [
                'label' => __('Enable Banner', 'guavasure'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'guavasure'),
                'label_off' => __('No', 'guavasure'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'banner_title',
            [
                'label' => __('Banner Title', 'guavasure'),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => __('Protect Your Pet Today', 'guavasure'),
                'placeholder' => __('Enter banner title', 'guavasure'),
            ]
        );

        $this->add_control(
            'banner_subtitle',
            [
                'label' => __('Banner Subtitle', 'guavasure'),
                'type' => \Elementor\Controls_Manager::TEXTAREA,
                'default' => __('Get comprehensive pet insurance coverage in minutes with personalized quotes', 'guavasure'),
                'placeholder' => __('Enter banner subtitle', 'guavasure'),
            ]
        );

        $this->add_control(
            'button_text',
            [
                'label' => __('Button Text', 'guavasure'),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => __('Get Instant Quote', 'guavasure'),
                'placeholder' => __('Enter button text', 'guavasure'),
            ]
        );

        $this->end_controls_section();

        // Style Section
        $this->start_controls_section(
            'style_section',
            [
                'label' => __('Colors', 'guavasure'),
                'tab' => \Elementor\Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'bg_color',
            [
                'label' => __('Background Color', 'guavasure'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#5423E7',
            ]
        );

        $this->add_control(
            'text_color',
            [
                'label' => __('Text Color', 'guavasure'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#FFFFFF',
            ]
        );

        $this->add_control(
            'button_color',
            [
                'label' => __('Button Background Color', 'guavasure'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#FFFFFF',
            ]
        );

        $this->add_control(
            'button_text_color',
            [
                'label' => __('Button Text Color', 'guavasure'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#5423E7',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        
        if ($settings['banner_enabled'] !== 'yes') {
            return;
        }

        $bg_color = esc_attr($settings['bg_color']);
        $text_color = esc_attr($settings['text_color']);
        $button_color = esc_attr($settings['button_color']);
        $button_text_color = esc_attr($settings['button_text_color']);
        $image_url = plugins_url('../assets/assets_aaa78dbbf3de43acaa5d259f4ee2e40d_f9a5631f68ed48b09eeac32b110c6783.webp', __FILE__);
        ?>
        
        <!-- Pet Insurance Banner -->
        <div class="guavasure-insurance-banner" style="
            background-color: <?php echo $bg_color; ?>;
            color: <?php echo $text_color; ?>;
            border-radius: 12px;
            margin: 24px 0;
            box-shadow: 0 4px 20px rgba(84, 35, 231, 0.15);
            overflow: hidden;
        ">
            <div class="guavasure-banner-wrapper">
                <!-- Banner Image -->
                <div class="guavasure-banner-image">
                    <img src="<?php echo esc_url($image_url); ?>" alt="Pet Insurance" />
                </div>
                
                <!-- Banner Content -->
                <div class="guavasure-banner-content">
                    <!-- Banner Text -->
                    <div class="guavasure-banner-text">
                        <h3 class="guavasure-banner-title">
                            <?php echo esc_html($settings['banner_title']); ?>
                        </h3>
                        <p class="guavasure-banner-subtitle">
                            <?php echo esc_html($settings['banner_subtitle']); ?>
                        </p>
                    </div>
                    
                    <!-- CTA Button -->
                    <button 
                        class="guavasure-cta-button"
                        onclick="GuavasureInsurance.openModal()"
                    >
                        <?php echo esc_html($settings['button_text']); ?>
                    </button>
                </div>
            </div>
        </div>

        <!-- Insurance Modal (Hidden by default) -->
        <div id="guavasure-insurance-modal" class="guavasure-modal" style="display: none;">
            <div class="guavasure-modal-overlay" onclick="GuavasureInsurance.closeModal()"></div>
            
            <div class="guavasure-modal-content">
                <!-- Chat Header with Mila -->
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
                
                <!-- Close Button -->
                <button class="guavasure-modal-close" onclick="GuavasureInsurance.closeModal()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
                
                <!-- Chat Messages Container -->
                <div id="guavasure-modal-body" class="guavasure-modal-body">
                    <!-- Chat messages will be dynamically injected here by JavaScript -->
                </div>
            </div>
        </div>
        
        <?php
    }
}
