import { client } from "@/config/http-client";
import {  GET_EXTERNAL_INCOME_LIST_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_EXTERNAL_INCOME } from "@/graphql/mutation/UPDATE_EXTERNAL_INCOME";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateExternalIncomeMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateExternalIncome } } =  await client.mutate({
          mutation: UPDATE_EXTERNAL_INCOME,
          variables,
        })
        return updateExternalIncome
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

