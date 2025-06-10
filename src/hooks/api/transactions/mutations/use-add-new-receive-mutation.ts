import { client } from "@/config/http-client";
import { RECEIVE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_NEW_RECEIVE } from "@/graphql/mutation/ADD_NEW_RECEIVE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddNewReceiveMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addNewReceive} } =  await client.mutate({
          mutation: ADD_NEW_RECEIVE,
          variables,
        })
        return addNewReceive
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


  // export function useEventCreateMutation(
  //   options: UseMutationOptions<Events, ClientError, EventCreateInput> = {},
  // ) {
  //   const queryClient = useQueryClient()
  
  //   const mutationFn = (data: EventCreateInput) => {
  //     return client.post<Events>(EVENTS_ENDPOINT, data)
  //   }
  
  //   const onSuccess = () => {
  //     queryClient.invalidateQueries({ queryKey: [EVENTS_QUERY_KEY] })
  //   }
  
  //   return useMutation({
  //     mutationFn,
  //     onSuccess,
  //     ...options,
  //   })
  // }