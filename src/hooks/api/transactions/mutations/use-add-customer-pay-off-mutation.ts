import { client } from "@/config/http-client";
import { GET_CUSTOMER_PAY_OFF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_CUSTOMER_PAY_OFF } from "@/graphql/mutation/ADD_CUSTOMER-PAY_OFF";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddCustomerPayOffMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addCustomerPayOff} } =  await client.mutate({
          mutation: ADD_CUSTOMER_PAY_OFF,
          variables,
        })
        return addCustomerPayOff
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_CUSTOMER_PAY_OFF_LIST_QUERY_KEY] })
      // queryClient.refetchQueries({ queryKey: [PAY_OF_LIST_QUERY_KEY] });

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

