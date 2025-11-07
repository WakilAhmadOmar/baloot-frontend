import { client } from "@/config/http-client"
import { GET_FIXED_ASSETS_REPORT_QUERY_KEY } from "@/constants/queries-key";
import { GET_TOTAL_FIXED_ASSETS_REPORT } from "@/graphql/queries/GET_FIXED_ASSETS_REPORT";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetTotalFixedAssetsQuery() {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getTotalFixedAssetsReport  }} = await client.query({
        query:GET_TOTAL_FIXED_ASSETS_REPORT,
        fetchPolicy:"network-only"
      })
     return getTotalFixedAssetsReport
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_FIXED_ASSETS_REPORT_QUERY_KEY ],
    })
  }
