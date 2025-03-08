/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ADZUNA_APP_ID: string;
    readonly VITE_ADZUNA_APP_KEY: string;
    // Add other environment variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }