
import { client } from "@/config/http-client";
import {  GET_BANK_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_BANK } from "@/graphql/mutation/DELETE_BANK";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteBankMutation = (options: UseMutationOptions<{message:string}, ClientError, {bankId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deleteBank } } =  await client.mutate({
          mutation: DELETE_BANK,
          variables,
        })
        return deleteBank
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_BANK_LIST_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
