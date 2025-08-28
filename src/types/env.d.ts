/// &lt;reference types="vite/client" /&gt;

interface ImportMetaEnv {
  readonly VITE_NOMOR_HP_ADMIN: string;
  // Add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}