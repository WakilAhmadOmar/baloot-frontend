import { client } from "@/config/http-client";
import {  GET_USER_CURRENCIES_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { UPDATE_USER_CURRENCY } from "@/graphql/mutation/UPDATE_USER_CURRENCY";
import { ADD_USER_CURRENCY } from "@/graphql/mutation/ADD_USER_CURRENCY";



export const useAddUserCurrencyMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addUserCurrency } } =  await client.mutate({
          mutation: ADD_USER_CURRENCY,
          variables,
        })
        return addUserCurrency
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_USER_CURRENCIES_QUERY_KEY] })

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

