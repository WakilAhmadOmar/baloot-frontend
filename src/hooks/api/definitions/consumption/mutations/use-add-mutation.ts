import { client } from "@/config/http-client";
import { GET_CONSUMPTION_TYPE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_NEW_CONSUMPTION_TYPE } from "@/graphql/mutation/ADD_NEW_CONSUMPTION_TYPE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddConsumptionTypeMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addNewConsumptionType } } =  await client.mutate({
          mutation: ADD_NEW_CONSUMPTION_TYPE,
          variables
        })
        return addNewConsumptionType
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

