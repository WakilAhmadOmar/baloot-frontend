import { client } from "@/config/http-client";
import { GET_PRODUCT_COUNT_IN_ENTREPOT_QUERY_KEY } from "@/constants/queries-key";
import { GET_PRODUCT_COUNT_IN_ENTREPOT } from "@/graphql/queries/GET_PRODUCT_COUNT_IN_ENTREPOT";
import { useQuery } from "react-query";

export const useGetProductCountInEntrepotQuery = (variables:any , enabled:boolean) => {
    return useQuery({
      queryFn: async () => {
        const { data: { getProductCountInEntrepot } } = await client.query({
          query: GET_PRODUCT_COUNT_IN_ENTREPOT,
          variables,
        });
        return getProductCountInEntrepot;
      },
      queryKey: [GET_PRODUCT_COUNT_IN_ENTREPOT_QUERY_KEY],
      enabled,
      refetchOnWindowFocus: false,
    } );
  };

