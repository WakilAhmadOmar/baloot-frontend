import { client } from "@/config/http-client";
import { GET_CATEGORIES_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_CATEGORY } from "@/graphql/mutation/UPDATE_CATEGORY";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdateCategoryMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updateCategory } } =  await client.mutate({
          mutation: UPDATE_CATEGORY,
          variables
        })
        return updateCategory
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

