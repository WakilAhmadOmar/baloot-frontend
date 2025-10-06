import { client } from "@/config/http-client";
import { GET_PRODUCT_FROM_ENTREPOT_BY_PRODUCT_ID_QUERY_KEY } from "@/constants/queries-key";
import { GET_PRODUCT_FROM_ALL_ENTREPOTS_BY_PRODUCT_ID } from "@/graphql/queries/GET_PRODUCT_FROM_ALL_ENTREPOTS_BY_PRODUCT_ID";
import { useQuery } from "react-query";

export const useGetProductFromEntrepotByProductIdQuery = (variables:any , enabled:boolean) => {
    return useQuery({
      queryFn: async () => {
        const { data: { getProductFromAllEntrepotsByProductId } } = await client.query({
          query: GET_PRODUCT_FROM_ALL_ENTREPOTS_BY_PRODUCT_ID,
          variables,
        });
        return getProductFromAllEntrepotsByProductId;
      },
      queryKey: [GET_PRODUCT_FROM_ENTREPOT_BY_PRODUCT_ID_QUERY_KEY],
      enabled,
      refetchOnWindowFocus: false,
    });
  };

