// Production environment — used by production builds.
// Earnivo configuration matches the known-working reference project.
export const environment = {
  production: true,
  earnivo: {
    apiBaseUrl: 'https://api.admobility.in/api',
    apiKey: 'ak_7e8815fe0a481188db902a329df3087f8fe8ee7b0c7eada8',
  },
} as const;
