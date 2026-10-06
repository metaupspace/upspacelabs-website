import type { Core } from '@strapi/strapi';

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => {
  // Let the admin panel preview media served from the R2 public URL (when configured).
  const r2PublicUrl = env('CF_R2_PUBLIC_URL', '');
  const mediaSources = /^https:\/\//.test(r2PublicUrl)
    ? [new URL(r2PublicUrl).origin]
    : [];

  return [
    'strapi::logger',
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': ["'self'", 'data:', 'blob:', ...mediaSources],
            'media-src': ["'self'", 'data:', 'blob:', ...mediaSources],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};

export default config;
