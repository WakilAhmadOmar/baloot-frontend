import { client } from "@/config/http-client";
import {  GET_PRE_BUY_BILL_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_PRE_BUY_BILL_LIST } from "@/graphql/queries/GET_PRE_BUY_BILL_LIST";
import { useQuery } from "react-query";

export const useGetPreBuyBillList = (variables:any) => {
    return useQuery({
      queryFn: async () => {
        const { data: { getPreBuyBillList } } = await client.query({
          query: GET_PRE_BUY_BILL_LIST, 
          variables,
          fetchPolicy:"network-only"
        });
        return getPreBuyBillList;
      },
      queryKey: [GET_PRE_BUY_BILL_LIST_QUERY_KEY , variables.page],
      refetchOnWindowFocus: false,
    });
  };

