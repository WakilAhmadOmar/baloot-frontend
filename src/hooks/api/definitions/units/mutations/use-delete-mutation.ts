import { client } from "@/config/http-client";
import {  GET_MEASURES_QUERY_KEY } from "@/constants/queries-key";
import { ADD_MEASURE } from "@/graphql/mutation/ADD_MEASURE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useDeleteMeasureMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addMeasure} } =  await client.mutate({
          mutation: ADD_MEASURE,
          variables
        })
        return addMeasure
      }
    
    const onSuccess = ()=> {
      queryClient.refetchQueries({ queryKey: [GET_MEASURES_QUERY_KEY] });
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

