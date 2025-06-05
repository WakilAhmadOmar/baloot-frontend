
import { client } from "@/config/http-client";
import {  GET_PARTNERS_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_PARTNER } from "@/graphql/mutation/DELETE_PARTNER";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeletePartnerMutation = (options: UseMutationOptions<{message:string}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deletePartner } } =  await client.mutate({
          mutation: DELETE_PARTNER,
          variables,
        })
        return deletePartner
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_PARTNERS_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
