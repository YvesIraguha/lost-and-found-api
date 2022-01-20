const resolvers = {
  Query: {
    getAllItems: (_, args, ctx) => ctx.models.Items.getAllItems(args),
    getItem: (_, { id }, ctx) => ctx.models.Items.getOneItem(id)
  },
  Mutation: {
    addItem: (_, args, ctx) => ctx.models.Items.addItem(args),
    updateItem: (_, { id, input }, ctx) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      ctx.models.Items.updateItem(id, input),
    deleteItem: (_, { id }, ctx) => ctx.models.Items.deleteItem(id)
  }
};

export default resolvers;
