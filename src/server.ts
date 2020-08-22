import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import chalk from 'chalk';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

import mongoose from 'mongoose';

import { appPort, isDev, configEssentials } from './config';

dotenv.config();

type mongoConfigProperties = { [key in typeof configEssentials[number]]: string };

const getDatabaseConfig = (): mongoConfigProperties =>
  configEssentials.reduce((result, current) => {
    if (!current) console.error(`Configuration property ${current} is not specified`);
    return { ...result, [current]: process.env[current] };
  }, {} as mongoConfigProperties);

const establishMongoConnection = (config: mongoConfigProperties) =>
  mongoose.connect(
    `mongodb+srv://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_NAME}`,
    { useNewUrlParser: true }
  );

(async () => {
  try {
    await establishMongoConnection(getDatabaseConfig());

    const app = express();
    app.disable('x-powered-by');

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      playground: isDev,
    });

    apolloServer.applyMiddleware({ app });

    app.listen({ port: appPort }, () => {
      console.log(chalk.green(`Listening http://localhost:${appPort}${apolloServer.graphqlPath}`));
    });
  } catch (e) {
    console.error(e);
  }
})();
