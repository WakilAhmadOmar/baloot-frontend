import { client } from "@/config/http-client";
import { GET_PARTNERS_QUERY_KEY } from "@/constants/queries-key";
import { ADD_PARTNER } from "@/graphql/mutation/ADD_PARTNER";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useAddPartnerMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {addPartner} } =  await client.mutate({
          mutation: ADD_PARTNER,
          variables
        })
        return addPartner
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_PARTNERS_QUERY_KEY ] })
    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };

