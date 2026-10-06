import type { Core } from '@strapi/strapi';

/**
 * Uploads go to Cloudflare R2 when its credentials are set (staging /
 * production). Without them — e.g. local Docker development — Strapi's
 * built-in `local` provider stores files in public/uploads, which
 * docker-compose.yml mounts, so media still works offline.
 */
const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  const r2Configured = [
    'CF_ACCOUNT_ID',
    'CF_R2_ACCESS_KEY_ID',
    'CF_R2_SECRET_ACCESS_KEY',
    'CF_R2_BUCKET',
    'CF_R2_PUBLIC_URL',
  ].every(key => {
    const value = env(key, '');
    // `.env.example` placeholders count as unset.
    return Boolean(value) && !/^your_|pub-xxxx/.test(value);
  });

  if (!r2Configured) return {};

  return {
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          baseUrl: env('CF_R2_PUBLIC_URL'),
          credentials: {
            accessKeyId: env('CF_R2_ACCESS_KEY_ID'),
            secretAccessKey: env('CF_R2_SECRET_ACCESS_KEY'),
          },
          region: 'auto',
          endpoint: `https://${env('CF_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
          params: {
            Bucket: env('CF_R2_BUCKET'),
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  };
};

export default config;
