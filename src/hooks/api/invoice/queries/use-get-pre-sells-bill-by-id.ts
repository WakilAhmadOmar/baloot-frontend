import { client } from "@/config/http-client";
import {  GET_PRE_SELL_BILL_BY_ID_QUERY_KEY } from "@/constants/queries-key";
import { GET_PRE_SELL_BILL_BY_ID } from "@/graphql/queries/GET_PRE_SELL_BILL_BY_ID";
import { useQuery } from "react-query";

export const useGetPreSellsBillById = (variables:any , enabled:boolean) => {
    return useQuery({
      queryFn: async () => {
        const { data: { getPreSellsBillById } } = await client.query({
          query: GET_PRE_SELL_BILL_BY_ID, 
          variables,
          fetchPolicy:"network-only"
        });
        return getPreSellsBillById;
      },
      queryKey: [GET_PRE_SELL_BILL_BY_ID_QUERY_KEY ],
      enabled,
      refetchOnWindowFocus: false,
    });
  };

