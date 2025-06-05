import { client } from "@/config/http-client";
import {  GET_SAFE_LIST_QUERY_KEY } from "@/constants/queries-key";

import { ADD_SAFE } from "@/graphql/mutation/ADD_SAFE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddSafeMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addSafe} } =  await client.mutate({
          mutation: ADD_SAFE,
          variables
        })
        return addSafe
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_SAFE_LIST_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

