import { client } from "@/config/http-client";
import { GET_BUY_BILL_LIST_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_BUY_BILL } from "@/graphql/mutation/UPDATE_BUY_BILL";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useUpdateBuyBillMutation = (
  options: UseMutationOptions<{}, ClientError, {}> = {}
) => {
  const queryClient = useQueryClient();
  const mutationFn = async (variables: any) => {
    const {
      data: { updateBuyBill },
    } = await client.mutate({
      mutation: UPDATE_BUY_BILL,
      variables,
    });
    return updateBuyBill;
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [GET_BUY_BILL_LIST_QUERY_KEY] });
  };
  return useMutation({
    mutationFn,
    onSuccess,
    ...options,
  });
};
