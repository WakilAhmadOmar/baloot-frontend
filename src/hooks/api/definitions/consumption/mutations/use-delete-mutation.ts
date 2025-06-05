import { client } from "@/config/http-client";
import {  GET_CONSUMPTION_TYPE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_CONSUMPTION_TYPE } from "@/graphql/mutation/DELETE_CONSUMPTION_TYPE";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteConsumptionTypeMutation = (
  options: UseMutationOptions<{message:string}, ClientError, {  }> = {}
) => {
  const queryClient = useQueryClient();
  const mutationFn = async (variables: any) => {
    const {
      data: { deleteConsumptionTYpe },
    } = await client.mutate({
      mutation: DELETE_CONSUMPTION_TYPE,
      variables,
    });
    return deleteConsumptionTYpe;
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [GET_CONSUMPTION_TYPE_LIST_QUERY_KEY] });
  };
  return useMutation({
    mutationFn,
    onSuccess,
    ...options,
  });
};
