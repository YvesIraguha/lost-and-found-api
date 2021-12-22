const resolvers = {
  Query: {
    getAllItems: (root, args, ctx) => ctx.models.Items.getAllItems(args)
  }
};

export default resolvers;
