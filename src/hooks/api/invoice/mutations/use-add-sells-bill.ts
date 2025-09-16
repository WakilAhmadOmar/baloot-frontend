import { client } from "@/config/http-client";
import {  GET_SELLS_BILL_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { ADD_SELLS_BILL } from "@/graphql/mutation/ADD_SELLS_BILL";


export const useAddSellsBillMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addSellsBill} } =  await client.mutate({
          mutation: ADD_SELLS_BILL,
          variables,
        })
        return addSellsBill
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
