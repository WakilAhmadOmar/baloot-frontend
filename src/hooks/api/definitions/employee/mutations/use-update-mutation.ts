import { client } from "@/config/http-client";
import {  GET_EMPLOYEE_LIST_QUERY_KEY } from "@/constants/queries-key";

import { UPDATE_EMPLOYEE } from "@/graphql/mutation/UPDATE_EMPLOYEE";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateEmployeeMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateEmployee} } =  await client.mutate({
          mutation: UPDATE_EMPLOYEE,
          variables
        })
        return updateEmployee
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_EMPLOYEE_LIST_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

