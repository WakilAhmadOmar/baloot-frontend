
import { client } from "@/config/http-client";
import {  GET_EXTERNAL_INCOME_TYPE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_EXTERNAL_INCOME_TYPE } from "@/graphql/mutation/DELETE_EXTERNAL_INCOME_TYPE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteExternalIncomeTypeMutation = (options: UseMutationOptions<{}, ClientError, {externalIncomeTypeId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deleteExternalIncomeType } } =  await client.mutate({
          mutation: DELETE_EXTERNAL_INCOME_TYPE,
          variables,
        })
        return deleteExternalIncomeType
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_EXTERNAL_INCOME_TYPE_LIST_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
