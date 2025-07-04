import { client } from "@/config/http-client";
import {  GET_USER_CURRENCIES_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { UPDATE_USER_CURRENCY_STATUS } from "@/graphql/mutation/UPDATE_USER_CURRENCY_STATUS";



export const useUpdateUserCurrencyStatusMutation = (options: UseMutationOptions<{message:string}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateUserCurrencyStatus } } =  await client.mutate({
          mutation: UPDATE_USER_CURRENCY_STATUS,
          variables,
        })
        return updateUserCurrencyStatus
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

