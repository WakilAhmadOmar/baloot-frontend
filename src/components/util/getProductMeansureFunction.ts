// this function get apollo client and return product measure

import { GET_MEASURES } from "@/graphql/queries/GET_MEASURES";

const getProductMeansureFunction = async (cleint: any) => {
  try {
    const {
      data: { getMeasures },
    } = await cleint.query({
      query: GET_MEASURES,
    });
    return {
      type: "success",
      getMeasures,
    };
  } catch (error: any) {
    return {
      type: "error",
      error: error.message,
    };
  }
};

export { getProductMeansureFunction };
