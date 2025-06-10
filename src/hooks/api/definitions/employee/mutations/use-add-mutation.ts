import { client } from "@/config/http-client";
import { GET_CUSTOMER_LIST_QUERY_KEY, GET_EMPLOYEE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_CUSTOMER } from "@/graphql/mutation/ADD_CUSTOMER";
import { ADD_EMPLOYEE } from "@/graphql/mutation/ADD_EMPLOYEE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddEmployeeMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addEmployee} } =  await client.mutate({
          mutation: ADD_EMPLOYEE,
          variables
        })
        return addEmployee
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

