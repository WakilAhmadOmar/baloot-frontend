import { client } from "@/config/http-client";
import {  GET_WARE_FROM_ENTREPOT_QUERY_KEY } from "@/constants/queries-key";
import { ADD_WARE_TO_ENTREPOT } from "@/graphql/mutation/ADD_WARE_TO_ENTREPOT";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddWareToEntrepotMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addWareToEntrepot} } =  await client.mutate({
          mutation: ADD_WARE_TO_ENTREPOT,
          variables
        })
        return addWareToEntrepot
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_WARE_FROM_ENTREPOT_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

