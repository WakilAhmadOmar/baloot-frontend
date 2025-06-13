import { client } from "@/config/http-client";
import { SELLS_BILL_BY_ID_QUERY_KEY } from "@/constants/queries-key";
import { GET_SELLS_BILL_BY_ID } from "@/graphql/queries/GET_SELLS_BILL_BY_ID";
import { useQuery } from "react-query";

export const useGetSellsBillByIdQuery = (variables:any) => {
    return useQuery({
      queryFn: async () => {
        const { data: { getSellsBillById } } = await client.query({
          query: GET_SELLS_BILL_BY_ID,
          variables,
        });
        return getSellsBillById;
      },
      queryKey: [SELLS_BILL_BY_ID_QUERY_KEY],
      refetchOnWindowFocus: false,
    });
  };

