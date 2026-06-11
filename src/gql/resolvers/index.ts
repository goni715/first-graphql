import { db } from "../../db";

export const resolvers = {
  Query: {
    products: () => db.products,
    product: (parent: any, args: { productId: string }, context: any) => {
      //console.log(parent, args, context);
      const result = db.products.find((p) => p.id === args.productId);
      return result;
    },
  },
};
