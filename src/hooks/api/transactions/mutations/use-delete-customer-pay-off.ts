import { client } from "@/config/http-client";
import { DELETE_CUSTOMER_PAY_OFF } from "@/graphql/mutation/DELETE_CUSTOMER_PAY_OFF";
import { GET_CUSTOMER_PAY_OFF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteCustomerPayOffMutation = (options: UseMutationOptions<{message:string}, ClientError, {payOffId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deleteCustomerPayOff } } =  await client.mutate({
          mutation: DELETE_CUSTOMER_PAY_OFF,
          variables,
        })
        return deleteCustomerPayOff
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_CUSTOMER_PAY_OFF_LIST_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
