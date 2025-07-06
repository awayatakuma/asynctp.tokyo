// Global type declarations
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SITE_ORIGIN?: string
      GA_ID?: string
    }
  }
}

export {}