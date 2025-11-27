import { client } from "@/config/http-client"
import { GET_TOTAL_RECEIVABLES_AND_LIABILITIES_REPORT_QUERY_KEY } from "@/constants/queries-key";
import { GET_TOTAL_RECEIVABLES_AND_LIABILITIES_REPORT } from "@/graphql/queries/GET_TOTAL_RECEIVABLES_AND_LIABILITIES_REPORT";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetTotalReceivablesAndLiabilitiesReportQuery() {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getTotalReceivablesAndLiabilitiesReport  }} = await client.query({
        query:GET_TOTAL_RECEIVABLES_AND_LIABILITIES_REPORT,
        fetchPolicy:"network-only"
      })
     return getTotalReceivablesAndLiabilitiesReport
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_TOTAL_RECEIVABLES_AND_LIABILITIES_REPORT_QUERY_KEY ],
    })
  }
