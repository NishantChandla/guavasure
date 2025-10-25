/**
 * Main Admin App Component
 * Wraps app in Shopify App Bridge and Polaris providers
 */

import React, { useEffect, useState } from 'react';
import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';
import { AppProvider } from '@shopify/polaris';
import SettingsForm from './components/SettingsForm';

const App: React.FC = () => {
  const [shop, setShop] = useState<string>('');
  const [host, setHost] = useState<string>('');

  useEffect(() => {
    // Get shop and host from URL params
    const params = new URLSearchParams(window.location.search);
    console.log('params', params.keys());
    const shopParam = params.get('shop') || '';
    const hostParam = params.get('host') || '';

    setShop(shopParam);
    setHost(hostParam);
  }, []);

  if (!shop || !host) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Loading...</h1>
        <p>Initializing Guavasure Embedded</p>
      </div>
    );
  }

  const appBridgeConfig = {
    // @ts-expect-error - import.meta.env is not typed
    apiKey: import.meta.env.VITE_SHOPIFY_CLIENT_ID || '',
    host: host,
    forceRedirect: false,
  };

  return (
    <AppBridgeProvider config={appBridgeConfig}>
      <AppProvider i18n={{}}>
        <SettingsForm shop={shop} />
      </AppProvider>
    </AppBridgeProvider>
  );
};

export default App;
