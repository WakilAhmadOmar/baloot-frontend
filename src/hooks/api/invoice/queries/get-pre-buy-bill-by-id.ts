import { client } from "@/config/http-client";
import { GET_PRE_BUY_BILL_BY_ID_QUERY_KEY } from "@/constants/queries-key";
import { GET_PRE_BUY_BILL_BY_ID } from "@/graphql/queries/GET-PRE-BUY-BILL-BY-ID";
import { useQuery } from "react-query";

export const useGetPreBuyBillByIdQuery = (variables:any ,  enabled:boolean) => {
    return useQuery({
      queryFn: async () => {
        const { data: { getPreBuyBillById } } = await client.query({
          query: GET_PRE_BUY_BILL_BY_ID,
          variables,
        });
        return getPreBuyBillById;
      },
      queryKey: [GET_PRE_BUY_BILL_BY_ID_QUERY_KEY],
      enabled,
      refetchOnWindowFocus: false,
    });
  };
