import { client } from "@/config/http-client";
import { GET_EMPLOYEE_SALARY_LIST_QUERY_KEY, GET_RECEIVE_FROM_EMPLOYEE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_RECEIVE_FROM_EMPLOYEE } from "@/graphql/mutation/DELETE_RECEIVE_FROM_EMPLOYEE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteReceiveFromEmployeeMutation = (
  options: UseMutationOptions<
    { message: string },
    ClientError,
    { receiveId: string }
  > = {}
) => {
  const queryClient = useQueryClient();
  const mutationFn = async (variables: any) => {
    const {
      data: { deleteReceiveFromEmployee },
    } = await client.mutate({
      mutation: DELETE_RECEIVE_FROM_EMPLOYEE,
      variables,
    });
    return deleteReceiveFromEmployee;
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [GET_RECEIVE_FROM_EMPLOYEE_LIST_QUERY_KEY],
    });
    queryClient.invalidateQueries({
      queryKey: [GET_EMPLOYEE_SALARY_LIST_QUERY_KEY],
    });
  };
  return useMutation({
    mutationFn,
    onSuccess,
    ...options,
  });
};
