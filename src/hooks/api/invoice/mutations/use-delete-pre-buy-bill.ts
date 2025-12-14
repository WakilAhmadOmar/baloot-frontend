import { client } from "@/config/http-client";
import { GET_PRE_BUY_BILL_LIST_QUERY_KEY } from "@/constants/queries-key";
import { ClientError } from "@/types";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { DELETE_PRE_BUY_BILL } from "@/graphql/mutation/DELETE_PRE_BUY_BILL";


export const useDeletePreBuyBillMutation = (options: UseMutationOptions<{message:string}, ClientError, {}> = {}) => {
  const queryClient = useQueryClient()
     const mutationFn = async (variables:any) => {
         const {data: {deletePreBuyBill} } =  await client.mutate({
          mutation: DELETE_PRE_BUY_BILL,
          variables,
        })
        return deletePreBuyBill
      }
    
    const onSuccess = ()=> {
      queryClient.invalidateQueries({ queryKey: [GET_PRE_BUY_BILL_LIST_QUERY_KEY] })

    }
    return useMutation({
      mutationFn,
      onSuccess,
      ...options
    })
  };
