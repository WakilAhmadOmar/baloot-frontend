import { client } from "@/config/http-client";
import { GET_BANK_LIST_QUERY_KEY, GET_CUSTOMER_LIST_QUERY_KEY, GET_EMPLOYEE_LIST_QUERY_KEY, GET_SAFE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_FIRST_PERIOD_OF_CREDIT } from "@/graphql/mutation/ADD_FIRST_PERIOD_OF_CREDIT";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddFirstPeriodOfCreditMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addFirstPeriodOfCredit} } =  await client.mutate({
          mutation: ADD_FIRST_PERIOD_OF_CREDIT,
          variables
        })
        return addFirstPeriodOfCredit
      }
    
    const onSuccess = ()=> {
      queryClient.refetchQueries({ queryKey: [GET_BANK_LIST_QUERY_KEY] });
      queryClient.refetchQueries({ queryKey: [GET_SAFE_LIST_QUERY_KEY] });
      queryClient.refetchQueries({ queryKey: [GET_CUSTOMER_LIST_QUERY_KEY] });
      queryClient.refetchQueries({ queryKey: [GET_EMPLOYEE_LIST_QUERY_KEY] });
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

