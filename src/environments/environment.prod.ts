// Production environment — used by production builds.
// Earnivo configuration matches the known-working reference project.
export const environment = {
  production: true,
  earnivo: {
    apiBaseUrl: 'https://api.admobility.in/api',
    apiKey: 'ak_860a81870e5e72eae370f9db4b7eb7c759ef1bb6b7ca1f4c',
  },
} as const;
