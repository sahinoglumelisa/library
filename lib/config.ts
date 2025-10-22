const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT,
    imagekit: {
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    },
    databaseUrl: process.env.DATABASE_URL,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL,
      redisToken: process.env.UPSTASH_REDIS_TOKEN,
      qstash: {
        url: process.env.QSTASH_URL,
        token: process.env.QSTASH_TOKEN,
      },
    },
    emailjs: {
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_KEY,
      serviceId: process.env.EMAILJS_SERVICE_ID,
      templateId: process.env.EMAILJS_TEMPLATE_ID,
    },
  },
};

export default config;
