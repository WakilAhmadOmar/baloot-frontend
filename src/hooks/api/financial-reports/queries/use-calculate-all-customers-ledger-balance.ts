import { client } from "@/config/http-client"
import {  GET_CALCULATE_ALL_CUSTOMERS_LEDGER_BALANCE_QUERY_KEY } from "@/constants/queries-key";
import { CALCULATE_ALL_CUSTOMERS_LEDGER_BALANCE } from "@/graphql/queries/CALCULATE_ALL_CUSTOMERS_LEDGER_BALANCE";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetCalculateAllCustomersLedgerBalanceQuery({page , limit}:{page:number , limit:number }) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { calculateAllCustomersLedgerBalance  }} = await client.query({
        query:CALCULATE_ALL_CUSTOMERS_LEDGER_BALANCE,
        variables:{page , limit},
        fetchPolicy:"network-only"
      })
     return calculateAllCustomersLedgerBalance
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_CALCULATE_ALL_CUSTOMERS_LEDGER_BALANCE_QUERY_KEY , page ],
    })
  }

