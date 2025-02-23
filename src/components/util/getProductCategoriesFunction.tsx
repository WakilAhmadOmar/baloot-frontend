// this function get apollo client and return product categories

import { GET_CATEGORIES } from "@/graphql/queries/GET_CATEGORIES";

const getProductCategoriesFunction = async (cleint: any) => {
  try {
    const {
      data: { getCategories },
    } = await cleint.query({
      query: GET_CATEGORIES,
    });
    return {
      type: "success",
      getCategories,
    };
  } catch (error: any) {
    return {
      type: "error",
      error: error.message,
    };
  }
};

export { getProductCategoriesFunction };
