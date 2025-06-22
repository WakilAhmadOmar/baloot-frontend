import { client } from "@/config/http-client";
import { DELETE_PAY_TO_CUSTOMER } from "@/graphql/mutation/DELETE_PAY_TO_CUSTOMER";
import { GET_PAY_TO_CUSTOMER_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeletePayToCustomerMutation = (options: UseMutationOptions<{message:string}, ClientError, {payOffId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deletePayToCustomer } } =  await client.mutate({
          mutation: DELETE_PAY_TO_CUSTOMER,
          variables,
        })
        return deletePayToCustomer
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_PAY_TO_CUSTOMER_LIST_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
