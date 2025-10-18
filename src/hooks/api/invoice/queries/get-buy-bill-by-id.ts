import { client } from "@/config/http-client";
import { GET_BUY_BILL_BY_ID_QUERY_KEY } from "@/constants/queries-key";
import { GET_BUY_BILL_BY_ID } from "@/graphql/queries/GET_BUY_BILL_BY_ID";
import { useQuery } from "react-query";

export const useGetBuyBillByIdQuery = (variables:any ,  enabled:boolean) => {
    return useQuery({
      queryFn: async () => {
        const { data: { getBuyBillById } } = await client.query({
          query: GET_BUY_BILL_BY_ID,
          variables,
        });
        return getBuyBillById;
      },
      queryKey: [GET_BUY_BILL_BY_ID_QUERY_KEY],
      enabled,
      refetchOnWindowFocus: false,
    });
  };

