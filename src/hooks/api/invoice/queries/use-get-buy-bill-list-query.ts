import { client } from "@/config/http-client";
import {  GET_BUY_BILL_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_BUY_BILL_LIST } from "@/graphql/queries/GET_BUY_BILL_LIST";
import { useQuery } from "react-query";

export const useGetBuyBillList = (variables:any) => {
    return useQuery({
      queryFn: async () => {
        const { data: { getBuyBillList } } = await client.query({
          query: GET_BUY_BILL_LIST,
          variables,
          fetchPolicy:"network-only"
        });
        return getBuyBillList;
      },
      queryKey: [GET_BUY_BILL_LIST_QUERY_KEY , variables.page],
      refetchOnWindowFocus: false,
    });
  };

