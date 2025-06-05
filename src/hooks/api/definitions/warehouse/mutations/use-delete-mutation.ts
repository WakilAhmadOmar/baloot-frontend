
import { client } from "@/config/http-client";
import {  GET_ENTREPOT_LIST_QUERY_KEY } from "@/constants/queries-key";
import { DELETE_ENTREPOT } from "@/graphql/mutation/DELETE_ENTREPOT";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

export const useDeleteWarehouseMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: { deleteEntrepot } } =  await client.mutate({
          mutation: DELETE_ENTREPOT,
          variables,
        })
        return deleteEntrepot
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_ENTREPOT_LIST_QUERY_KEY]
       })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
