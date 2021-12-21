import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { schema } from './schema';
import { resolvers } from './resolvers';

const graphQLSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

const handle = async (event, context, callback) => {
  const callbackWithHeaders = (error, output) => {
    // eslint-disable-next-line no-param-reassign
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  };
  const handler = graphqlLambda({ schema: graphQLSchema });
  return handler(event, context, callbackWithHeaders);
};

export default handle;
