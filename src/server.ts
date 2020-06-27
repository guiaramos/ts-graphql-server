import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import { GraphQLServer, Options } from 'graphql-yoga';
import GraphQLSetup from './graphql';
import { defaultConnection } from './config/typeorm';

function server() {
  dotenv.config();
  const logs = (isConnected: boolean) => {
    console.log(`Database ready: ${isConnected}`);
  };
  const connectDB = async () => {
    try {
      const { isConnected } = await createConnection(defaultConnection);
      return isConnected;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const graphqlServer = async () => {
    const yogaServer = new GraphQLServer({
      typeDefs: GraphQLSetup().getProps().typeDefs,
      resolvers: GraphQLSetup().getProps().resolvers
    });

    const options: Options = {
      port: process.env.PORT,
      endpoint: `/${process.env.ENDPOINT}`,
      subscriptions: `/${process.env.SUBSCRIPTIONS}`,
      playground: `/${process.env.PLAYGROUND}`
    };

    await yogaServer.start(options, ({ port, endpoint }) =>
      console.log(
        `🚀 Server ready at: ${process.env.CONNECTION}://${process.env.HOST}:${port}${endpoint}`
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
