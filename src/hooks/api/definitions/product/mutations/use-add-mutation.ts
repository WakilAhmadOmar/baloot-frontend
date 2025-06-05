import { client } from "@/config/http-client";
import { GET_PRODUCTS_QUERY_KEY } from "@/constants/queries-key";
import { ADD_PRODUCT } from "@/graphql/mutation/ADD_PRODUCT";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddProductMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addProduct} } =  await client.mutate({
          mutation: ADD_PRODUCT,
          variables
        })
        return addProduct
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

