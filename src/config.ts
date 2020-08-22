export const isDev = process.env.NODE_ENV === 'development';

export const defaultPort = 3000;
export const appPort = process.env.APP_PORT || defaultPort;

export const configEssentials = <const>[
  'MONGO_USERNAME',
  'MONGO_PASSWORD',
  'MONGO_HOST',
  'MONGO_PORT',
  'MONGO_NAME',
];
