/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_X_RAPID_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
