import { client } from "@/config/http-client";
import { PAY_OF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { SUBMIT_EMPLOYEE_SALARY } from "@/graphql/mutation/SUBMIT_EMPLOYEE_SALARY";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useSubmitEmployeeSalaryMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {submitEmployeeSalary } } =  await client.mutate({
          mutation: SUBMIT_EMPLOYEE_SALARY,
          variables,
        })
        return submitEmployeeSalary
      }
    
    const onSuccess = ()=> {
      queryClient.refetchQueries({ queryKey: [PAY_OF_LIST_QUERY_KEY] });

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

