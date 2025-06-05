import { client } from "@/config/http-client";
import { GET_CUSTOMER_LIST_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_CUSTOMER } from "@/graphql/mutation/UPDATE_CUSTOMER";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateCustomerMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateCustomer} } =  await client.mutate({
          mutation: UPDATE_CUSTOMER,
          variables
        })
        return updateCustomer
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

