import { client } from "@/config/http-client";
import { PAY_OF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_PAY_OFF } from "@/graphql/mutation/ADD_PAY_OF";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddPayOffMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addPayOff} } =  await client.mutate({
          mutation: ADD_PAY_OFF,
          variables,
        })
        return addPayOff
      }
    
    const onSuccess = ()=> {
      // queryClient.invalidateQueries({ queryKey: [RECEIVE_LIST_QUERY_KEY] })
      queryClient.refetchQueries({ queryKey: [PAY_OF_LIST_QUERY_KEY] });

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

