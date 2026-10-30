// Development environment (used by `ng serve` and any non-production build).
//
// Earnivo configuration matching the known-working reference project.
// Keep the API key aligned with the Website Verification campaign used by this site.
export const environment = {
  production: false,
  earnivo: {
    apiBaseUrl: 'https://api.admobility.in/api',
    apiKey: 'ak_7e8815fe0a481188db902a329df3087f8fe8ee7b0c7eada8',
  },
} as const;
