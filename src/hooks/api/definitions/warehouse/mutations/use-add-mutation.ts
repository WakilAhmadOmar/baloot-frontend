import { client } from "@/config/http-client";
import { GET_ENTREPOT_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_ENTREPOT } from "@/graphql/mutation/ADD_ENTREPOT";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddEntrepotMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addEntrepot} } =  await client.mutate({
          mutation: ADD_ENTREPOT,
          variables
        })
        return addEntrepot
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_ENTREPOT_LIST_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

