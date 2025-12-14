import { client } from "@/config/http-client";
import { GET_USER_CURRENCIES_QUERY_KEY } from "@/constants/queries-key";
import { GET_USER_CURRENCIES } from "@/graphql/queries/GET_USER_CURRENCIES";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query";

export function useGetUserCurrenciesQuery() {
  const { setHandleError } = useContext(AppContext);
  return useQuery({
    queryFn: async () => {
      const {
        data: { getUserCurrencies },
      } = await client.query({
        query: GET_USER_CURRENCIES,
        fetchPolicy: "network-only",
      });
      return getUserCurrencies;
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open: true,
        status: "error",
        message: error.message,
      });
    },
    queryKey: [GET_USER_CURRENCIES_QUERY_KEY],
  });
}
