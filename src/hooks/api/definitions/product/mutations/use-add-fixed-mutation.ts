import { client } from "@/config/http-client";
import { GET_FIXED_PRODUCTS_QUERY_KEY } from "@/constants/queries-key";
import { ADD_FIXED_PRODUCT } from "@/graphql/mutation/ADD_FIXED_PRODUCT";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddFixedProductMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addFixedProduct} } =  await client.mutate({
          mutation: ADD_FIXED_PRODUCT,
          variables
        })
        return addFixedProduct
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

