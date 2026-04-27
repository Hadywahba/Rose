export const normalize = (url?: string | null) => {
  if (!url) return '/images/logo.png';

  return url.replace(
    'www.rose-app.elevate-bootcamp.cloud',
    'rose-app.elevate-bootcamp.cloud',
  );
};
