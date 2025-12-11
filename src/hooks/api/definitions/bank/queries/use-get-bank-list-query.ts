import { client } from "@/config/http-client"
import {  GET_BANK_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_BANK_LIST } from "@/graphql/queries/GET_BANK_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetBankListQuery() {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getBankList   }} = await client.query({
        query:GET_BANK_LIST,
        fetchPolicy:"network-only"
      })
     return getBankList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_BANK_LIST_QUERY_KEY  ],
    })
  }

