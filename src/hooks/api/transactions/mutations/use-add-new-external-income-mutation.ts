import { client } from "@/config/http-client";
import {  GET_EXTERNAL_INCOME_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_NEW_EXTERNAL_INCOME } from "@/graphql/mutation/ADD_NEW_EXTERNAL_INCOME";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddNewExternalIncomeMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { addNewExternalIncome } } =  await client.mutate({
          mutation: ADD_NEW_EXTERNAL_INCOME,
          variables,
        })
        return addNewExternalIncome
      }
    
    const onSuccess = ()=> {
      queryClient.refetchQueries({ queryKey: [GET_EXTERNAL_INCOME_LIST_QUERY_KEY] });

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

