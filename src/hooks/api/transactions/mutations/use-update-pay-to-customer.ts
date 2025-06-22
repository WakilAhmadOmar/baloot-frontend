import { client } from "@/config/http-client";
import { UPDATE_PAY_TO_CUSTOMER } from "@/graphql/mutation/UPDATE_PAY_TO_CUSTOMER";
import { GET_PAY_TO_CUSTOMER_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdatePayToCustomerMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updatePayToCustomer } } =  await client.mutate({
          mutation: UPDATE_PAY_TO_CUSTOMER,
          variables,
        })
        return updatePayToCustomer
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_PAY_TO_CUSTOMER_LIST_QUERY_KEY] })
      // queryClient.refetchQueries({ queryKey: [PAY_OF_LIST_QUERY_KEY] });

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

