import { client } from "@/config/http-client";
import { GET_CATEGORIES_QUERY_KEY } from "@/constants/queries-key";
import { ADD_CATEGORY } from "@/graphql/mutation/ADD_CATEGORY";
import { DELETE_CATEGORY } from "@/graphql/mutation/DELETE_CATEGORY";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useDeleteCategoryMutation = (options: UseMutationOptions<{message:string}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {deleteCategory } } =  await client.mutate({
          mutation: DELETE_CATEGORY,
          variables
        })
        return deleteCategory
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

