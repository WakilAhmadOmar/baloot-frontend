import { client } from "@/config/http-client";
import { GET_CATEGORIES_QUERY_KEY, GET_PRODUCTS_QUERY_KEY } from "@/constants/queries-key";
import { GET_CATEGORIES } from "@/graphql/queries/GET_CATEGORIES";
import { GET_PRODUCTS } from "@/graphql/queries/GET_PRODUCTS";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query";

export const useGetProductCategoryList = () => {
  const { setHandleError } = useContext(AppContext);
  return useQuery({
    queryFn: async () => {
      const {
        data: { getCategories  },
      } = await client.query({
        query: GET_CATEGORIES,
        fetchPolicy: "network-only",
      });
      return getCategories;
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open: true,
        type: "error",
        message: error.message,
      });
    },
    queryKey: [GET_CATEGORIES_QUERY_KEY],
  });
};
