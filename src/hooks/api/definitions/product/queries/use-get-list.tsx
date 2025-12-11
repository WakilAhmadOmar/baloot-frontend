import { client } from "@/config/http-client";
import { GET_PRODUCTS_QUERY_KEY } from "@/constants/queries-key";
import { GET_PRODUCTS } from "@/graphql/queries/GET_PRODUCTS";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query";

export const useGetProductList = ({ page, limit = 10 }: { page: number, limit?: number }) => {
  const { setHandleError } = useContext(AppContext);
  return useQuery({
    queryFn: async () => {
      const {
        data: { getProducts },
      } = await client.query({
        query: GET_PRODUCTS,
        variables: { page, limit },
        fetchPolicy: "network-only",
      });
      return getProducts;
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open: true,
        type: "error",
        message: error.message,
      });
    },
    queryKey: [GET_PRODUCTS_QUERY_KEY, page , limit],
  });
};
