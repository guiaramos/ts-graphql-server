import express from 'express';
import http from 'http';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import GraphQLSetup from './graphql';
import { loadEnv } from './lib/loadEnvironment';
import ROUTES from './constants/ROUTES';
import { confirmEmailController } from './controllers/confirmEmailController';

loadEnv();
const server = {
  logs(apolloServer: ApolloServer, isConnected: boolean) {
    console.log(`🌎 [envoriment]: ${process.env.NODE_ENV}`);
    console.log(`📖 [database]: ${isConnected}`);
    console.log(
      `🚀 Server ready at: ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}${apolloServer.graphqlPath}`
    );
  },

  connectionPG: {
    async create() {
      const connectionOptions = await getConnectionOptions(
        process.env.NODE_ENV
      );
      const connection = await createConnection({
        ...connectionOptions,
        name: 'default'
      });
      return connection;
    },
    async close() {
      await getConnection().close();
    }
  },

  apollo: {
    create() {
      return new ApolloServer({
        typeDefs: GraphQLSetup().getProps().typeDefs,
        resolvers: GraphQLSetup().getProps().resolvers,
        context: GraphQLSetup().getProps().context
      });
    },
    mock() {
      return new ApolloServer({
        typeDefs: GraphQLSetup().getProps().typeDefs,
        resolvers: GraphQLSetup().getProps().resolvers,
        context: GraphQLSetup().getProps().context,
        mocks: true
      });
    }
  },

  app: {
    async create() {
      const app = express();
      return app;
    }
  },

  applyMiddlewares(apolloServer: ApolloServer, app: express.Express) {
    apolloServer.applyMiddleware({
      app,
      cors: { origin: true, credentials: true }
    });
  },

  createHTTPServer(app: express.Express): http.Server {
    const httpServer = http.createServer(app);
    return httpServer;
  },

  routes(app: express.Express) {
    app.get(`${ROUTES.CONFIRM_EMAIL}/:id`, confirmEmailController);
  },

  listen(httpServer: http.Server): void {
    httpServer.listen(process.env.PORT);
  },

  async start() {
    const connection = await this.connectionPG.create();
    const apolloServer = this.apollo.create();
    const app = await this.app.create();
    this.routes(app);
    this.applyMiddlewares(apolloServer, app);
    const httpServer = this.createHTTPServer(app);
    this.listen(httpServer);
    this.logs(apolloServer, connection.isConnected);
  }
};

export default server;
