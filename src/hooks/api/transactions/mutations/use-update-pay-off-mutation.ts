import { client } from "@/config/http-client";
// import { PAY_OF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_PAY_OFF } from "@/graphql/mutation/UPDATE_PAY_OFF";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdatePayOffMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updatePayOff } } =  await client.mutate({
          mutation: UPDATE_PAY_OFF,
          variables,
        })
        return updatePayOff
      }
    
    const onSuccess = ()=> {
      // queryClient.invalidateQueries({ queryKey: [RECEIVE_LIST_QUERY_KEY] })
      // queryClient.refetchQueries({ queryKey: [PAY_OF_LIST_QUERY_KEY] });

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

