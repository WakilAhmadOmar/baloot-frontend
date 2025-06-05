import { client } from "@/config/http-client";
import { GET_EMPLOYEE_PAY_OFF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_EMPLOYEE_PAY_OFF } from "@/graphql/mutation/DELETE_EMPLOYEE_PAY_OFF";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteEmployeePayOffMutation = (options: UseMutationOptions<{message:string}, ClientError, {payOffId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deleteEmployeePayOff } } =  await client.mutate({
          mutation: DELETE_EMPLOYEE_PAY_OFF,
          variables,
        })
        return deleteEmployeePayOff
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_EMPLOYEE_PAY_OFF_LIST_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
