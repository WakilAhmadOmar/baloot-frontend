
import { client } from "@/config/http-client"
import {  GET_CUSTOMER_REPORTS_BY_CUSTOMER_ID_QUERY_KEY } from "@/constants/queries-key";
import { GET_CUSTOMER_REPORTS_BY_CUSTOMER_ID } from "@/graphql/queries/GET_CUSTOMER_REPORTS_BY_CUSTOMER_ID";

import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetCustomerReportsByCustomerIdListQuery({page , customerId  }:{page:number , customerId:string }) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getCustomerReportsByCustomerId }} = await client.query({
        query:GET_CUSTOMER_REPORTS_BY_CUSTOMER_ID,
        variables:{page , customerId},
        fetchPolicy:"network-only"
      })
     return getCustomerReportsByCustomerId   },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_CUSTOMER_REPORTS_BY_CUSTOMER_ID_QUERY_KEY , page ],
    })
  }

