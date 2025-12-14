import { client } from "@/config/http-client";
import {  GET_PRE_SELLS_BILL_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { DELETE_PRE_SELLS_BILL } from "@/graphql/mutation/DELETE_PRE_SELLS_BILL";


export const useDeletePreSellsBillMutation = (options: UseMutationOptions<{message:string}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {deletePreSellsBill} } =  await client.mutate({
          mutation: DELETE_PRE_SELLS_BILL,
          variables,
        })
        return deletePreSellsBill
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_PRE_SELLS_BILL_LIST_QUERY_KEY] })

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
