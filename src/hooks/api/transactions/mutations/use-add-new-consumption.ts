import { client } from "@/config/http-client";
import { GET_CONSUMPTION_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_NEW_CONSUMPTION } from "@/graphql/mutation/ADD_NEW_CONSUMPTION";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddNewConsumptionMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addNewConsumption} } =  await client.mutate({
          mutation: ADD_NEW_CONSUMPTION,
          variables,
        })
        return addNewConsumption
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

