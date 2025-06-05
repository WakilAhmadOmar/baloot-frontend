import { client } from "@/config/http-client";
import { GET_ENTREPOT_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_ENTREPOT_LIST } from "@/graphql/queries/GET_ENTREPOT_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query";

export const useGetWarehouseList = ({ page }: { page: number }) => {
  const { setHandleError } = useContext(AppContext);
  return useQuery({
    queryFn: async () => {
      const {
        data: { getEntrepotList },
      } = await client.query({
        query: GET_ENTREPOT_LIST,
        variables: { page },
        fetchPolicy: "network-only",
      });
      return getEntrepotList;
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open: true,
        type: "error",
        message: error.message,
      });
    },
    queryKey: [GET_ENTREPOT_LIST_QUERY_KEY, page],
  });
};
