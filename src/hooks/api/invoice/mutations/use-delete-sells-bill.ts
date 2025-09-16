import { client } from "@/config/http-client";
import {  GET_SELLS_BILL_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { DELETE_SELLS_BILL } from "@/graphql/mutation/DELETE_SELLS_BILL";


export const useDeleteSellsBillMutation = (options: UseMutationOptions<{message:string}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {deleteSellsBill} } =  await client.mutate({
          mutation: DELETE_SELLS_BILL,
          variables,
        })
        return deleteSellsBill
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_SELLS_BILL_LIST_QUERY_KEY] })

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
