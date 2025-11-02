
import { client } from "@/config/http-client";
import {  GET_FIXED_PRODUCTS_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_FIXED_PRODUCT } from "@/graphql/mutation/DELETE_FIXED_PRODUCT";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteFixedProductMutation = (options: UseMutationOptions<{}, ClientError, {productId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deleteFixedProduct } } =  await client.mutate({
          mutation: DELETE_FIXED_PRODUCT,
          variables,
        })
        return deleteFixedProduct
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_FIXED_PRODUCTS_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
