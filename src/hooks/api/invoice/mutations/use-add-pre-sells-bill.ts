

import { client } from "@/config/http-client";
import {  GET_PRE_SELLS_BILL_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { ADD_PRE_SELLS_BILL } from "@/graphql/mutation/ADD_PRE_SELLS_BILL";


export const useAddPreSellsBillMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addPreSellsBill} } =  await client.mutate({
          mutation: ADD_PRE_SELLS_BILL,
          variables,
        })
        return addPreSellsBill
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
