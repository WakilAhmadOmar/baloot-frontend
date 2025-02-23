// this function get apollo client and return product measure

import { GET_MEANSURES } from "@/graphql/queries/GET_MEANSURES";

const getProductMeansureFunction = async (cleint: any) => {
  try {
    const {
      data: { getMeasures },
    } = await cleint.query({
      query: GET_MEANSURES,
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
