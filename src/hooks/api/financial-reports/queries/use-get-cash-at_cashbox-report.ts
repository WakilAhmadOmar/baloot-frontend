import { client } from "@/config/http-client"
import {   GET_CASH_AT_CASHBOX_REPORT_QUERY_KEY } from "@/constants/queries-key";
import { GET_CASH_AT_CASHBOX_REPORT } from "@/graphql/queries/GET_CASH_AT_CASHBOX_REPORT";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetCashAtCashboxReportQuery() {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getCashOnHandReport  }} = await client.query({
        query:GET_CASH_AT_CASHBOX_REPORT,
        fetchPolicy:"network-only"
      })
     return getCashOnHandReport
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_CASH_AT_CASHBOX_REPORT_QUERY_KEY ],
    })
  }
