import { client } from "@/config/http-client";
import {  GET_WARE_FROM_ENTREPOT_QUERY_KEY } from "@/constants/queries-key";
import { GET_WARE_FROM_ENTREPOT } from "@/graphql/queries/GET_WARE_FROM_ENTREPOT";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query";

export const useGetWareFromEntrepotQuery = ({
  page,
  entrepotId,
  existProduct,
}: {
  existProduct: boolean;
  page: number;
  entrepotId: string;
}) => {
  const { setHandleError } = useContext(AppContext);
  return useQuery({
    queryFn: async () => {
      const {
        data: { getWareFromEntrepot },
      } = await client.query({
        query: GET_WARE_FROM_ENTREPOT,
        variables: { page, entrepotId, existProduct },
        fetchPolicy: "network-only",
      });
      return getWareFromEntrepot;
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open: true,
        type: "error",
        message: error.message,
      });
    },
    queryKey: [GET_WARE_FROM_ENTREPOT_QUERY_KEY, page],
  });
};
