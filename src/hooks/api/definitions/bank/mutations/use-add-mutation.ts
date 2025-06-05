import { client } from "@/config/http-client";
import {  GET_BANK_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_BANK } from "@/graphql/mutation/ADD_BANK";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddBankMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addBank } } =  await client.mutate({
          mutation: ADD_BANK,
          variables
        })
        return addBank 
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_BANK_LIST_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

