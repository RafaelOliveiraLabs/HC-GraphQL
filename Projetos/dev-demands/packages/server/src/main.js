import express, { response } from "express";
import cors from "cors";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  const app = express();

  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
    },

    bodyParserConfig: true,
  });

  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
  const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

  await new Promise((resolve) => app.listen({ port: PORT, hostname: HOSTNAME }, resolve));
  app.listen(() => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}`);
  });
  return { server, app };
}

startApolloServer();
