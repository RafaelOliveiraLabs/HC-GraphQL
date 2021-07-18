import express, { response } from "express";
import cors from "cors";
import { ApolloServer, gql } from "apollo-server-express";

async function startApolloServer() {
  const typeDefs = gql`
    type Client {
      id: ID!
      name: String!
    }

    type Demand {
      id: ID!
      name: String!
      client: Client!
      deadline: String
    }

    type Query {
      demands: [Demand]!
    }
  `;

  const resolvers = {
    Query: {
      demands: () => [],
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  const app = express();

  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  /* server.get("/status", (_, response) => {
  response.send({
    status: "Okay",
  });
}); */

  /* server.options("/authenticate", enableCors).post("/authenticate", enableCors, express.json(), (request, response) => {
  console.log("E-mail", request.body.email, "Senha", request.body.password);

  response.send({
    Okay: true,
  });
}); */

  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
  const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

  await new Promise((resolve) => app.listen({ port: PORT, hostname: HOSTNAME }, resolve));
  app.listen(() => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}`);
  });
  return { server, app };
}

startApolloServer();
