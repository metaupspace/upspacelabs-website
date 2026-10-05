import type { Core } from '@strapi/strapi';

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
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
});

export default config;
