import { client } from "@/config/http-client"
import {  GET_CONSUMPTION_REPORT_QUERY_KEY } from "@/constants/queries-key";
import { GET_CONSUMPTION_REPORT } from "@/graphql/queries/GET_CONSUMPTION_REPORT";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetConsumptionReportQuery() {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getConsumptionReport  }} = await client.query({
        query:GET_CONSUMPTION_REPORT,
        fetchPolicy:"network-only"
      })
     return getConsumptionReport
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_CONSUMPTION_REPORT_QUERY_KEY ],
    })
  }

