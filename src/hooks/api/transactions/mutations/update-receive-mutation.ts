import { client } from "@/config/http-client";
import { RECEIVE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_RECEIVE } from "@/graphql/mutation/UPDATE_RECEIVE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateReceiveMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateReceive } } =  await client.mutate({
          mutation: UPDATE_RECEIVE,
          variables,
        })
        return updateReceive
      }
    
    const onSuccess = ()=> {
      // queryClient.invalidateQueries({ queryKey: [RECEIVE_LIST_QUERY_KEY] })
      queryClient.refetchQueries({ queryKey: [RECEIVE_LIST_QUERY_KEY] });

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

