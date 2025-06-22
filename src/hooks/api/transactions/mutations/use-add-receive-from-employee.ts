import { client } from "@/config/http-client";
import {  GET_RECEIVE_FROM_EMPLOYEE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_RECEIVE_FROM_EMPLOYEE } from "@/graphql/mutation/ADD_RECEIVE_FROM_EMPLOYEE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddReceiveFromEmployeeMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addReceiveFromEmployee} } =  await client.mutate({
          mutation: ADD_RECEIVE_FROM_EMPLOYEE,
          variables,
        })
        return addReceiveFromEmployee
      }
    
    const onSuccess = ()=> {
      // queryClient.invalidateQueries({ queryKey: [RECEIVE_LIST_QUERY_KEY] })
      queryClient.refetchQueries({ queryKey: [GET_RECEIVE_FROM_EMPLOYEE_LIST_QUERY_KEY] });

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

