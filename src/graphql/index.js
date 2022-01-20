import { ApolloServer } from 'apollo-server-lambda';
import schema from './schema';
import resolvers from './resolvers';
import DynamoConnector from './dynamoConnector';
import Item from './model';

const dynamoConnector = new DynamoConnector({
  tableName: process.env.SINGLE_TABLE_NAME,
  options: { region: process.env.SERVERLESS_REGION }
});

const handler = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    event,
    context,
    models: {
      Items: new Item(dynamoConnector)
    }
  })
}).createHandler({
  cors: { credentials: true, origin: '*' }
});

export const handle = (event, context, cb) => handler(event, context, cb);

export default handle;
