// Production environment — used by production builds.
// Earnivo configuration matches the known-working reference project.
export const environment = {
  production: true,
  earnivo: {
    apiBaseUrl: 'https://api.admobility.in/api',
    apiKey: 'ak_909eba9df5ad4053046d8334c28f19eb838ccf883ffb2ef3',
  },
} as const;
