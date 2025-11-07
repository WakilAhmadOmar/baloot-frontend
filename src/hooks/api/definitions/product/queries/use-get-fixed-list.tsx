import { client } from "@/config/http-client";
import { GET_FIXED_PRODUCTS_QUERY_KEY } from "@/constants/queries-key";
import { GET_FIXED_PRODUCTS } from "@/graphql/queries/GET_FIXED_PRODUCTS";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query";

export const useGetFixedProductList = ({ page }: { page: number }) => {
  const { setHandleError } = useContext(AppContext);
  return useQuery({
    queryFn: async () => {
      const {
        data: { getFixedProducts },
      } = await client.query({
        query: GET_FIXED_PRODUCTS,
        variables: { page },
        fetchPolicy: "network-only",
      });
      return getFixedProducts;
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open: true,
        type: "error",
        message: error.message,
      });
    },
    queryKey: [GET_FIXED_PRODUCTS_QUERY_KEY, page],
  });
};
