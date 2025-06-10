import { client } from "@/config/http-client";
import { UPDATE_CUSTOMER_PAY_OFF } from "@/graphql/mutation/UPDATE_CUSTOMER_PAY_OFF";
import { GET_CUSTOMER_PAY_OFF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateCustomerPayOffMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateCustomerPayOff } } =  await client.mutate({
          mutation: UPDATE_CUSTOMER_PAY_OFF,
          variables,
        })
        return updateCustomerPayOff
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

