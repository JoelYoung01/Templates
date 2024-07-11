/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // Add Env Variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
