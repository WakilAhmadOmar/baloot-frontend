import { client } from "@/config/http-client";
import { GET_CUSTOMER_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_CUSTOMER } from "@/graphql/mutation/ADD_CUSTOMER";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddCustomerMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addCustomer} } =  await client.mutate({
          mutation: ADD_CUSTOMER,
          variables
        })
        return addCustomer
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_CUSTOMER_LIST_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

