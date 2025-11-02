import { client } from "@/config/http-client";
import { GET_FIXED_PRODUCTS_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_FIXED_PRODUCT } from "@/graphql/mutation/UPDATE_FIXED_PRODUCT";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateFixedProductMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateFixedProduct} } =  await client.mutate({
          mutation: UPDATE_FIXED_PRODUCT,
          variables
        })
        return updateFixedProduct
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_FIXED_PRODUCTS_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

