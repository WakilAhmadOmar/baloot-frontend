import { client } from "@/config/http-client"
import {  GET_EXTERNAL_INCOME_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_EXTERNAL_INCOME_LIST } from "@/graphql/queries/GET_EXTERNAL_INCOME_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetExternalIncomeListQuery({page  }:{page:number }) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getExternalIncomeList  }} = await client.query({
        query:GET_EXTERNAL_INCOME_LIST,
        variables:{page, },
        fetchPolicy:"network-only"
      })
     return getExternalIncomeList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_EXTERNAL_INCOME_LIST_QUERY_KEY , page ],
    })
  }
