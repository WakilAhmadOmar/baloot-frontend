import { client } from "@/config/http-client";
import { GET_RECEIVE_FROM_CUSTOMER_LIST_QUERY_KEY } from "@/constants/queries-key";
import {  ADD_RECEIVE_FROM_CUSTOMER } from "@/graphql/mutation/ADD_RECEIVE_FROM_CUSTOMER";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddReceiveCustomerMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addReceiveFromCUstomer} } =  await client.mutate({
          mutation: ADD_RECEIVE_FROM_CUSTOMER,
          variables,
        })
        return addReceiveFromCUstomer
      }
    
    const onSuccess = ()=> {
      // queryClient.invalidateQueries({ queryKey: [RECEIVE_LIST_QUERY_KEY] })
      queryClient.refetchQueries({ queryKey: [GET_RECEIVE_FROM_CUSTOMER_LIST_QUERY_KEY] });

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