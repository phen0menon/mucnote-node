import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import * as typeDefs from './schema/schema.graphql';
import resolvers from './resolverMap';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
