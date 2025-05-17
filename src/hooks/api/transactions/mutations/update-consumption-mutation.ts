import { client } from "@/config/http-client";
import { GET_CONSUMPTION_LIST_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_CONSUMPTION } from "@/graphql/mutation/UPDATE_CONSUMPTION";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateConsumptionMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateConsumption } } =  await client.mutate({
          mutation: UPDATE_CONSUMPTION,
          variables,
        })
        return updateConsumption
      }
    
    const onSuccess = ()=> {
      queryClient.refetchQueries({ queryKey: [GET_CONSUMPTION_LIST_QUERY_KEY] });

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

