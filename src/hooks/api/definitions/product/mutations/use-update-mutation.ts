import { client } from "@/config/http-client";
import { GET_PRODUCTS_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_PRODUCT } from "@/graphql/mutation/UPDATE_PRODUCT";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateProductMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateProduct} } =  await client.mutate({
          mutation: UPDATE_PRODUCT,
          variables
        })
        return updateProduct
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

