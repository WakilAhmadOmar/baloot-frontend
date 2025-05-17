import { client } from "@/config/http-client";
import { PAY_OF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_PAY_OFF } from "@/graphql/mutation/DELETE_PAY_OFF";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeletePayOffMutation = (options: UseMutationOptions<{message:string}, ClientError, {payOffId:string}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deletePayOff } } =  await client.mutate({
          mutation: DELETE_PAY_OFF,
          variables,
        })
        return deletePayOff
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [PAY_OF_LIST_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
