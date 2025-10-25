/**
 * Merchant Settings Form Component
 * Allows merchants to configure insurance banner and commission settings
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Checkbox,
  Select,
  RangeSlider,
  Banner,
  Text,
  BlockStack,
  InlineStack,
} from '@shopify/polaris';
import axios from 'axios';

interface SettingsFormProps {
  shop: string;
}

interface Settings {
  bannerEnabled: boolean;
  bannerText: string;
  bannerButtonText: string;
  commission: number;
  bannerPosition: string;
  primaryColor: string;
  secondaryColor: string;
  showOnCart: boolean;
  showOnCheckout: boolean;
  bannerIcon: string;
  showIcon: boolean;
  buttonColor: string;
  textColor: string;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ shop }) => {
  const [settings, setSettings] = useState<Settings>({
    bannerEnabled: true,
    bannerText: '🛡️ Insure your pet for peace of mind!',
    bannerButtonText: 'Get Quote',
    commission: 10,
    bannerPosition: 'above-checkout',
    primaryColor: '#4A90E2',
    secondaryColor: '#50E3C2',
    showOnCart: true,
    showOnCheckout: false,
    bannerIcon: '🐾',
    showIcon: true,
    buttonColor: '#FFFFFF',
    textColor: '#FFFFFF',
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch current settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`/api/settings?shop=${shop}`);
        setSettings(response.data);
      } catch (err: any) {
        console.error('Failed to fetch settings:', err);
        setError('Failed to load settings');
      }
    };

    fetchSettings();
  }, [shop]);

  // Save settings
  const handleSave = useCallback(async () => {
    setLoading(true);
    setSaved(false);
    setError(null);

    try {
      await axios.put('/api/settings', {
        shop,
        ...settings,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      console.error('Failed to save settings:', err);
      setError('Failed to save settings');
    } finally {
      setLoading(false);
    }
  }, [shop, settings]);

  const positionOptions = [
    { label: 'Above checkout button', value: 'above-checkout' },
    { label: 'Below cart items', value: 'below-items' },
    { label: 'Top of cart', value: 'top-of-cart' },
  ];

  console.log('settings', settings);

  return (
    <Page
      title="Guavasure Insurance Settings"
      subtitle={`Configure insurance banner for ${shop}`}
      primaryAction={{
        content: 'Save',
        onAction: handleSave,
        loading,
      }}
    >
      <Layout>
        {saved && (
          <Layout.Section>
            <Banner onDismiss={() => setSaved(false)}>
              Settings saved successfully!
            </Banner>
          </Layout.Section>
        )}

        {error && (
          <Layout.Section>
            <Banner onDismiss={() => setError(null)}>{error}</Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Banner Settings
              </Text>

              <FormLayout>
                <Checkbox
                  label="Enable insurance banner on cart"
                  checked={settings.bannerEnabled}
                  onChange={(value) =>
                    setSettings({ ...settings, bannerEnabled: value })
                  }
                />

                <TextField
                  label="Banner Text"
                  value={settings.bannerText}
                  onChange={(value) =>
                    setSettings({ ...settings, bannerText: value })
                  }
                  autoComplete="off"
                  helpText="Text shown on the insurance banner"
                />

                <TextField
                  label="Button Text"
                  value={settings.bannerButtonText}
                  onChange={(value) =>
                    setSettings({ ...settings, bannerButtonText: value })
                  }
                  autoComplete="off"
                  helpText="Text shown on the call-to-action button"
                />

                <Select
                  label="Banner Position"
                  options={positionOptions}
                  value={settings.bannerPosition}
                  onChange={(value) =>
                    setSettings({ ...settings, bannerPosition: value })
                  }
                />
              </FormLayout>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Commission & Pricing
              </Text>

              <FormLayout>
                <RangeSlider
                  label="Commission Percentage"
                  value={settings.commission}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      commission: typeof value === 'number' ? value : value[0],
                    })
                  }
                  min={0}
                  max={30}
                  output
                  suffix={<p>{settings.commission}%</p>}
                  helpText="Your commission on each insurance policy sold"
                />
              </FormLayout>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Display Options
              </Text>

              <FormLayout>
                <Checkbox
                  label="Show on cart page"
                  checked={settings.showOnCart}
                  onChange={(value) =>
                    setSettings({ ...settings, showOnCart: value })
                  }
                />

                <Checkbox
                  label="Show on checkout page"
                  checked={settings.showOnCheckout}
                  onChange={(value) =>
                    setSettings({ ...settings, showOnCheckout: value })
                  }
                />
              </FormLayout>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Icon Settings
              </Text>

              <FormLayout>
                <Checkbox
                  label="Show icon on banner"
                  checked={settings.showIcon}
                  onChange={(value) =>
                    setSettings({ ...settings, showIcon: value })
                  }
                />

                <TextField
                  label="Banner Icon (Emoji)"
                  value={settings.bannerIcon}
                  onChange={(value) =>
                    setSettings({ ...settings, bannerIcon: value })
                  }
                  autoComplete="off"
                  helpText="Use an emoji or short text (e.g., 🐾, 🛡️, 🐶)"
                />
              </FormLayout>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Theme Customization
              </Text>

              <FormLayout>
                <InlineStack gap="400">
                  <TextField
                    label="Primary Color"
                    type="text"
                    value={settings.primaryColor}
                    onChange={(value) =>
                      setSettings({ ...settings, primaryColor: value })
                    }
                    autoComplete="off"
                    helpText="Main gradient color"
                  />

                  <TextField
                    label="Secondary Color"
                    type="text"
                    value={settings.secondaryColor}
                    onChange={(value) =>
                      setSettings({ ...settings, secondaryColor: value })
                    }
                    autoComplete="off"
                    helpText="Gradient end color"
                  />
                </InlineStack>

                <InlineStack gap="400">
                  <TextField
                    label="Text Color"
                    type="text"
                    value={settings.textColor}
                    onChange={(value) =>
                      setSettings({ ...settings, textColor: value })
                    }
                    autoComplete="off"
                    helpText="Banner text color"
                  />

                  <TextField
                    label="Button Background"
                    type="text"
                    value={settings.buttonColor}
                    onChange={(value) =>
                      setSettings({ ...settings, buttonColor: value })
                    }
                    autoComplete="off"
                    helpText="CTA button color"
                  />
                </InlineStack>
              </FormLayout>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Preview
              </Text>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#f6f6f7',
                  borderRadius: '8px',
                  border: '1px solid #e1e3e5',
                }}
              >
                <div
                  style={{
                    padding: '20px',
                    background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)`,
                    color: settings.textColor,
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  {settings.showIcon && (
                    <div style={{ fontSize: '32px' }}>
                      {settings.bannerIcon}
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        marginBottom: '4px',
                      }}
                    >
                      Protect Your Pet Today
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>
                      {settings.bannerText}
                    </div>
                  </div>
                  <button
                    style={{
                      padding: '12px 24px',
                      backgroundColor: settings.buttonColor,
                      color: settings.primaryColor,
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  >
                    {settings.bannerButtonText}
                  </button>
                </div>
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default SettingsForm;
