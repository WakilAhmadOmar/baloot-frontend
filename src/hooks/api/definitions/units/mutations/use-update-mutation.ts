import { client } from "@/config/http-client";
import {  GET_MEASURES_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_MEASURE } from "@/graphql/mutation/UPDATE_MEASURE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateMeasureMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateMeasure} } =  await client.mutate({
          mutation: UPDATE_MEASURE,
          variables
        })
        return updateMeasure
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

