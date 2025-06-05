import { client } from "@/config/http-client";
import { ADD_EMPLOYEE_PAY_OFF } from "@/graphql/mutation/ADD_EMPLOYEE_PAY_OFF";
import { GET_EMPLOYEE_PAY_OFF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddEmployeePayOffMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addEmployeePayOff} } =  await client.mutate({
          mutation: ADD_EMPLOYEE_PAY_OFF,
          variables,
        })
        return addEmployeePayOff
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

