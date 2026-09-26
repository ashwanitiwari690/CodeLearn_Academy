// Development environment (used by `ng serve` and any non-production build).
//
// Earnivo configuration matching the known-working reference project.
// Keep the API key aligned with the Website Verification campaign used by this site.
export const environment = {
  production: false,
  earnivo: {
    apiBaseUrl: 'https://api.admobility.in/api',
    apiKey: 'ak_860a81870e5e72eae370f9db4b7eb7c759ef1bb6b7ca1f4c',
  },
} as const;
