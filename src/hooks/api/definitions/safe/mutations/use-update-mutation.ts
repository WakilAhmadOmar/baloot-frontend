import { client } from "@/config/http-client";
import { GET_SAFE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_SAFE } from "@/graphql/mutation/UPDATE_SAFE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateSafeMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateSafe } } =  await client.mutate({
          mutation: UPDATE_SAFE,
          variables
        })
        return updateSafe 
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

