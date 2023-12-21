/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // 다른 환경 변수들에 대한 타입 정의...
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
