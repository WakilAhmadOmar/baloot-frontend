
import { client } from "@/config/http-client";
import {  GET_EXTERNAL_INCOME_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_EXTERNAL_INCOME } from "@/graphql/mutation/DELETE_EXTERNAL_INCOME";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteExternalIncomeMutation = (options: UseMutationOptions<{message:string}, ClientError, {externalIncomeId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deleteExternalIncome } } =  await client.mutate({
          mutation: DELETE_EXTERNAL_INCOME,
          variables,
        })
        return deleteExternalIncome
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_EXTERNAL_INCOME_LIST_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
