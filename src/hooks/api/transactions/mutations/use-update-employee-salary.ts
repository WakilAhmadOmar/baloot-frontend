import { client } from "@/config/http-client";
import {   GET_EMPLOYEE_SALARY_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { UPDATE_EMPLOYEE_SALARY } from "@/graphql/mutation/UPDATE_EMPLOYEE_SALARY";



export const useUpdateEmployeeSalaryMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateEmployeeSalary } } =  await client.mutate({
          mutation: UPDATE_EMPLOYEE_SALARY,
          variables,
        })
        return updateEmployeeSalary
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_EMPLOYEE_SALARY_LIST_QUERY_KEY] })

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

