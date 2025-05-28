import { client } from "@/config/http-client";
import { GET_CONSUMPTION_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_CONSUMPTION } from "@/graphql/mutation/DELETE_CONSUMPTION";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteConsumptionMutation = (options: UseMutationOptions<{message:string}, ClientError, {consumptionId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deleteConsumption } } =  await client.mutate({
          mutation: DELETE_CONSUMPTION,
          variables,
        })
        return deleteConsumption
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_CONSUMPTION_LIST_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
