const resolvers = {
  Query: {
    getAllItems: (root, args, ctx) => ctx.models.Items.getAllItems(args)
  },
  Mutation: { addItem: (root, args, ctx) => ctx.models.Items.addItem(args) }
};

export default resolvers;
