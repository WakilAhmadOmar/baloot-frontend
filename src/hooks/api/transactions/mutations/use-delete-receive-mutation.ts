import { client } from "@/config/http-client";
import { RECEIVE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_RECEIVE } from "@/graphql/mutation/DELETE_RECEIVE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteReceiveMutation = (options: UseMutationOptions<{message:string}, ClientError, {receiveId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deleteReceive } } =  await client.mutate({
          mutation: DELETE_RECEIVE,
          variables,
        })
        return deleteReceive
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [RECEIVE_LIST_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
