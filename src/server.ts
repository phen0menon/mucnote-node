import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import schema from './schema';

dotenv.config();

const port = process.env.SERVER_PORT || 3000;
const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
});

app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
httpServer.listen({ port }, () => {
  console.log(`Dev server is listening on ${port}`);
});
