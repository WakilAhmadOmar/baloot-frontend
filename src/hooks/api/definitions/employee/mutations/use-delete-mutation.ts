import { client } from "@/config/http-client";
import { GET_EMPLOYEE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_EMPLOYEE } from "@/graphql/mutation/DELETE_EMPLOYEE";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteEmployeeMutation = (
  options: UseMutationOptions<{ message: string }, ClientError, {}> = {}
) => {
  const queryClient = useQueryClient();
  const mutationFn = async (variables: any) => {
    const {
      data: { deleteEmployee },
    } = await client.mutate({
      mutation: DELETE_EMPLOYEE,
      variables,
    });
    return deleteEmployee;
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [GET_EMPLOYEE_LIST_QUERY_KEY] });
  };
  return useMutation({
    mutationFn,
    onSuccess,
    ...options,
  });
};
