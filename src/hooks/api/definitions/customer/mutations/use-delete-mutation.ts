import { client } from "@/config/http-client";
import { GET_CUSTOMER_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_CUSTOMER } from "@/graphql/mutation/DELETE_CUSTOMER";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteCustomerMutation = (
  options: UseMutationOptions<{message:string}, ClientError, {  }> = {}
) => {
  const queryClient = useQueryClient();
  const mutationFn = async (variables: any) => {
    const {
      data: { deleteCustomer },
    } = await client.mutate({
      mutation: DELETE_CUSTOMER,
      variables,
    });
    return deleteCustomer;
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [GET_CUSTOMER_LIST_QUERY_KEY] });
  };
  return useMutation({
    mutationFn,
    onSuccess,
    ...options,
  });
};
