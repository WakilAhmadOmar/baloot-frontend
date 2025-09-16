import { client } from "@/config/http-client";
import {  GET_SELLS_BILL_LIST_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_SELLS_BILL } from "@/graphql/mutation/UPDATE_SELLS_BILL";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateSellsBillMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateSellsBill } } =  await client.mutate({
          mutation: UPDATE_SELLS_BILL,
          variables,
        })
        return updateSellsBill
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_SELLS_BILL_LIST_QUERY_KEY] });

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

