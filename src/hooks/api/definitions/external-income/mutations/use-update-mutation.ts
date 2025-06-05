import { client } from "@/config/http-client";
import { GET_EXTERNAL_INCOME_TYPE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_EXTERNAL_INCOME_TYPE } from "@/graphql/mutation/UPDATE_EXTERNAL_INCOME_TYPE";

import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateExternalIncomeTypeMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateExternalIncomeType} } =  await client.mutate({
          mutation: UPDATE_EXTERNAL_INCOME_TYPE,
          variables
        })
        return updateExternalIncomeType
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_EXTERNAL_INCOME_TYPE_LIST_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

