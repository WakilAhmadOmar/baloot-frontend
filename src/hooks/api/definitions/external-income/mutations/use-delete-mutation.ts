
import { client } from "@/config/http-client";
import {  GET_PRODUCTS_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_PRODUCT } from "@/graphql/mutation/DELETE_PRODUCT";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteExternalIncomeTypeMutation = (options: UseMutationOptions<{}, ClientError, {productId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deleteProduct } } =  await client.mutate({
          mutation: DELETE_PRODUCT,
          variables,
        })
        return deleteProduct
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
