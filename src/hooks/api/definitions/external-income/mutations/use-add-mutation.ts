import { client } from "@/config/http-client";
import { GET_EXTERNAL_INCOME_TYPE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ADD_NEW_EXTERNAL_INCOME_TYPE } from "@/graphql/mutation/ADD_NEW_EXTERNAL_INCOME_TYPE";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddExternalIncomeTypeMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addNewExternalIncomeType} } =  await client.mutate({
          mutation: ADD_NEW_EXTERNAL_INCOME_TYPE,
          variables
        })
        return addNewExternalIncomeType
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

