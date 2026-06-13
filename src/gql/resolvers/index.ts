import { db } from "../../db";

export const resolvers = {
  Query: {
    products: () => db.products,
    product: (parent: any, args: { productId: string }, context: any) => {
      //console.log(parent, args, context);
      const result = db.products.find((p) => p.id === args.productId);
      return result;
    },
    categories: () => db.categories,
    category: (parent: any, args: { categoryId: string }, context: any) => {
      const result = db.categories.find((c) => c.id === args.categoryId);
      return result;
    },
  },
  Product: {
    category: (parent: any, args: any, context: any) => {
      //console.log(parent.categoryId);
      const result = db.categories.find((c) => c.id === parent.categoryId);
      const reviews = db.reviews.filter((review)=>review.productId === parent.id)
      return result;
    },
    reviews: (parent: any, args: any, context: any) => {
      //console.log(parent.id);//productId
      const result = db.reviews.filter((review)=>review.productId === parent.id)
      return result;
    },
  },
  Category: {
    products: (parent:any, args:any, context:any) => {
      //console.log(parent.id);//categoryId
      const result = db.products.filter((cv)=> cv.categoryId === parent.id);
      return result;
    },
  },
};
