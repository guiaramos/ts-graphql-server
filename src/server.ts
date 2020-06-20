import { createConnection } from 'typeorm';
import { GraphQLServer, Options } from 'graphql-yoga';
import GraphQLSetup from './graphql';

function server() {
  const logs = (isConnected: boolean) => {
    console.log(`Database ready: ${isConnected}`);
  };
  const connectDB = async () => {
    const { isConnected } = await createConnection();
    return isConnected;
  };

  const graphqlServer = async () => {
    const yogaServer = new GraphQLServer({
      typeDefs: GraphQLSetup().getProps().typeDefs,
      resolvers: GraphQLSetup().getProps().resolvers
    });

    const options: Options = {
      port: process.env.PORT,
      endpoint: '/graphql',
      subscriptions: '/subscriptions',
      playground: '/playground'
    };

    await yogaServer.start(options, ({ port, endpoint }) =>
      console.log(
        `🚀 Server ready at: http://${process.env.HOST}:${port}${endpoint}`
      )
    );
  };

  const start = async () => {
    const isConnected = await connectDB();
    await graphqlServer();
    logs(isConnected);
  };

  return {
    start
  };
}

export default server;
