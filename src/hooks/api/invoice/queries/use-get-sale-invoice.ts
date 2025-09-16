import { client } from "@/config/http-client";
import {  GET_SELLS_BILL_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_SELLS_BILL_LIST } from "@/graphql/queries/GET_SELLS_BILL_LIST";;
import { useQuery } from "react-query";

export const useGetSellsBillList = (variables:any) => {
    return useQuery({
      queryFn: async () => {
        const { data: { getSellsBillList} } = await client.query({
          query: GET_SELLS_BILL_LIST,
          variables,
          fetchPolicy:"network-only"
        });
        return getSellsBillList;
      },
      queryKey: [GET_SELLS_BILL_LIST_QUERY_KEY , variables.page],
      refetchOnWindowFocus: false,
    });
  };

