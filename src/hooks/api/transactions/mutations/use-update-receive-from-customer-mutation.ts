import { client } from "@/config/http-client";
import { GET_RECEIVE_FROM_CUSTOMER_LIST_QUERY_KEY } from "@/constants/queries-key";
import {  UPDATE_RECEIVE_FROM_CUSTOMER } from "@/graphql/mutation/UPDATE_RECEIVE-FROM_CUSTOMER";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateReceiveFromCustomerMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateReceiveFromCustomer } } =  await client.mutate({
          mutation: UPDATE_RECEIVE_FROM_CUSTOMER,
          variables,
        })
        return updateReceiveFromCustomer
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

