import { resolvers as demandResolvers } from "./Demand/Demand";
import { resolvers as clientResolvers } from "./Client/Client";

const resolvers = {
  ...clientResolvers,
  ...demandResolvers,

  Query: {
    ...clientResolvers.Query,
    ...demandResolvers.Query,
  },
};

export default resolvers;
