import { client } from "@/config/http-client";
import { UPDATE_CUSTOMER_PAY_OFF } from "@/graphql/mutation/UPDATE_CUSTOMER_PAY_OFF";
import {  GET_EMPLOYEE_PAY_OFF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { UPDATE_EMPLOYEE_PAY_OFF } from "@/graphql/mutation/UPDATE_EMPLOYEE_PAY_OFF";


export const useUpdateEmployeePayOffMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateEmployeePayOff } } =  await client.mutate({
          mutation: UPDATE_EMPLOYEE_PAY_OFF,
          variables,
        })
        return updateEmployeePayOff
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_EMPLOYEE_PAY_OFF_LIST_QUERY_KEY] })

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

