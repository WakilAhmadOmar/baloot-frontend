import { client } from "@/config/http-client";
import { GET_CATEGORIES_QUERY_KEY } from "@/constants/queries-key";
import { ADD_CATEGORY } from "@/graphql/mutation/ADD_CATEGORY";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddCategoryMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addCategory } } =  await client.mutate({
          mutation: ADD_CATEGORY,
          variables
        })
        return addCategory
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

