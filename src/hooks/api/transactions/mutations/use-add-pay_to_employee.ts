import { client } from "@/config/http-client";
import { ADD_PAY_TO_EMPLOYEE } from "@/graphql/mutation/ADD_PAY_TO_EMPLOYEE";
import { GET_PAY_TO_EMPLOYEE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddPayToEmployeeMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addPayToEmployee} } =  await client.mutate({
          mutation: ADD_PAY_TO_EMPLOYEE,
          variables,
        })
        return addPayToEmployee
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_PAY_TO_EMPLOYEE_LIST_QUERY_KEY] })

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

