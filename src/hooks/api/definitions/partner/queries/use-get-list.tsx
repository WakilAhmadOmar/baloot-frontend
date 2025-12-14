import { client } from "@/config/http-client";
import { GET_PARTNERS_QUERY_KEY } from "@/constants/queries-key";
import { GET_PARTNER_LIST } from "@/graphql/queries/GET_PARTNER_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query";

export const useGetPartnerList = () => {
  const { setHandleError } = useContext(AppContext);
  return useQuery({
    queryFn: async () => {
      const {
        data: { getPartnerList },
      } = await client.query({
        query: GET_PARTNER_LIST,
        fetchPolicy: "network-only",
      });
      return getPartnerList;
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open: true,
        type: "error",
        message: error.message,
      });
    },
    queryKey: [GET_PARTNERS_QUERY_KEY],
  });
};
