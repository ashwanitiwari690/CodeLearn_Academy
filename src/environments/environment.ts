// Development environment (used by `ng serve` and any non-production build).
//
// Earnivo configuration matching the known-working reference project.
// Keep the API key aligned with the Website Verification campaign used by this site.
export const environment = {
  production: false,
  earnivo: {
    apiBaseUrl: 'https://api.admobility.in/api',
    apiKey: 'ak_909eba9df5ad4053046d8334c28f19eb838ccf883ffb2ef3',
  },
} as const;
