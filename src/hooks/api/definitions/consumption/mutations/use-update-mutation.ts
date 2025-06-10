import { client } from "@/config/http-client";
import { GET_CONSUMPTION_TYPE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_CONSUMPTION_TYPE } from "@/graphql/mutation/UPDATE_CONSUMPTION_TYPE";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateConsumptionTypeMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateConsumptionType} } =  await client.mutate({
          mutation: UPDATE_CONSUMPTION_TYPE,
          variables
        })
        return updateConsumptionType
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_CONSUMPTION_TYPE_LIST_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

