// this function get  apollo client and return currencies

import { GET_USER_CURRENCIES } from "@/graphql/queries/GET_USER_CURRENCIES";

// user selected curencies
const getUserCurrenciesFunction = async (cleint: any) => {
  try {
    const {
      data: { getUserCurrencies },
    } = await cleint.query({
      query: GET_USER_CURRENCIES,
    });
    return {
      type: "success",
      getUserCurrencies,
    };
  } catch (error: any) {
    return {
      type: "error",
      error: error.message,
    };
  }
};

export { getUserCurrenciesFunction };
