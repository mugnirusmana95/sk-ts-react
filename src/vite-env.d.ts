/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_MODE: 'local' | 'development' | 'staging' | 'production'
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
