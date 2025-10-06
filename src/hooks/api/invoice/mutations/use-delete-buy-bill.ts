import { client } from "@/config/http-client";
import {  GET_BUY_BILL_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { DELETE_BUY_BILL } from "@/graphql/mutation/DELETE_BUY_BILL";


export const useDeleteBuyBillMutation = (options: UseMutationOptions<{message:string}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {deleteBuyBill} } =  await client.mutate({
          mutation: DELETE_BUY_BILL,
          variables,
        })
        return deleteBuyBill
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_BUY_BILL_LIST_QUERY_KEY] })

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
