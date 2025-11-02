import { client } from "@/config/http-client"
import {  GET_FINANCIAL_REPORTS_FOR_BUY_PRODUCTS_QUERY_KEY } from "@/constants/queries-key";
import { GET_FINANCIAL_REPORTS_FOR_BUY_PRODUCTS } from "@/graphql/queries/GET_FINANCIAL_REPORTS_FOR_BUY_PRODUCTS";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetFinancialReportsForBuyProductsQuery() {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getFinantialReportsForBuyProducts  }} = await client.query({
        query:GET_FINANCIAL_REPORTS_FOR_BUY_PRODUCTS,
        fetchPolicy:"network-only"
      })
     return getFinantialReportsForBuyProducts
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_FINANCIAL_REPORTS_FOR_BUY_PRODUCTS_QUERY_KEY ],
    })
  }
