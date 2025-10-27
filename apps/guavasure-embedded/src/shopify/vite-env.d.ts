/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOPIFY_CLIENT_ID: string;
  readonly VITE_SHOPIFY_API_KEY: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
