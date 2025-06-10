import { client } from "@/config/http-client";
import { GET_ENTREPOT_LIST_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_ENTREPOT } from "@/graphql/mutation/UPDATE_ENTREPOT";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateWarehouseMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateEntrepot} } =  await client.mutate({
          mutation: UPDATE_ENTREPOT,
          variables
        })
        return updateEntrepot
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

