import { client } from "@/config/http-client";
import {  GET_PRE_SELLS_BILL_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_PRE_SELLS_BILL_LIST } from "@/graphql/queries/GET_PRE_SELLS_BILL_LIST";
import { useQuery } from "react-query";

export const useGetPreSellsBillList = (variables:any) => {
    return useQuery({
      queryFn: async () => {
        const { data: { getPreSellsBillList} } = await client.query({
          query: GET_PRE_SELLS_BILL_LIST,
          variables,
          fetchPolicy:"network-only"
        });
        return getPreSellsBillList;
      },
      queryKey: [GET_PRE_SELLS_BILL_LIST_QUERY_KEY , variables.page],
      refetchOnWindowFocus: false,
    });
  };
