import { client } from "@/config/http-client";
import { GET_PARTNERS_QUERY_KEY } from "@/constants/queries-key";
import { UPDATE_PARTNER } from "@/graphql/mutation/UPDATE_PARTNER";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";


export const useUpdatePartnerMutation = (options: UseMutationOptions<{}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {updatePartner} } =  await client.mutate({
          mutation: UPDATE_PARTNER,
          variables
        })
        return updatePartner
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

