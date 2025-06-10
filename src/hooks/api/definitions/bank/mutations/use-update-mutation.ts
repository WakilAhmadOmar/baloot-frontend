import { client } from "@/config/http-client";
import { GET_BANK_LIST_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_BANK } from "@/graphql/mutation/UPDATE_BANK";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateBankMutation = (options: UseMutationOptions<{message:string}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateBank } } =  await client.mutate({
          mutation: UPDATE_BANK,
          variables
        })
        return updateBank 
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_BANK_LIST_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

