import { client } from "@/config/http-client";
import { GET_RECEIVE_FROM_CUSTOMER_LIST_QUERY_KEY } from "@/constants/queries-key";
import {  DELETE_RECEIVE_FROM_CUSTOMER } from "@/graphql/mutation/DELETE_RECEIVE_FROM_CUSTOMER";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteReceiveFromCustomerMutation = (options: UseMutationOptions<{message:string}, ClientError, {receiveId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deleteReceiveFromCustomer } } =  await client.mutate({
          mutation: DELETE_RECEIVE_FROM_CUSTOMER,
          variables,
        })
        return deleteReceiveFromCustomer
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_RECEIVE_FROM_CUSTOMER_LIST_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
