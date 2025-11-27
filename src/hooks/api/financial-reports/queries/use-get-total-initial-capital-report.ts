import { client } from "@/config/http-client"
import {  GET_TOTAL_INITIAL_CAPITAL_REPORT_QUERY_KEY } from "@/constants/queries-key";
import { GET_TOTAL_INITIAL_CAPITAL_REPORT } from "@/graphql/queries/GET_TOTAL_INITIAL_CAPITAL_REPORT";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetTotalInitialCapitalReportQuery() {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getTotalInitialCapitalReport  }} = await client.query({
        query:GET_TOTAL_INITIAL_CAPITAL_REPORT,
        fetchPolicy:"network-only"
      })
     return getTotalInitialCapitalReport
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_TOTAL_INITIAL_CAPITAL_REPORT_QUERY_KEY ],
    })
  }
