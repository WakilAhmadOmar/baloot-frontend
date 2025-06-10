
import { client } from "@/config/http-client";
import {  GET_SAFE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_SAFE } from "@/graphql/mutation/DELETE_SAFE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteSafeMutation = (options: UseMutationOptions<{}, ClientError, {safeId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deleteSafe } } =  await client.mutate({
          mutation: DELETE_SAFE,
          variables,
        })
        return deleteSafe
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_SAFE_LIST_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
