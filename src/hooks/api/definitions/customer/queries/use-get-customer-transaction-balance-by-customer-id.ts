
import { client } from "@/config/http-client"
import { GET_EMPLOYEE_TRANSACTION_BALANCE_BY_CUSTOMER_ID_QUERY_KEY } from "@/constants/queries-key";
import { GET_CUSTOMER_TRANSACTION_BALANCE_BY_CUSTOMER_ID } from "@/graphql/queries/GET_CUSTOMER_TRANSACTION_BALANCE_BY_CUSTOMER_ID";

import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetCustomerTransactionBalanceByCustomerIdQuery({ customerId  }:{ customerId:string }) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getCustomerTransactionBalanceByCustomerId }} = await client.query({
        query:GET_CUSTOMER_TRANSACTION_BALANCE_BY_CUSTOMER_ID,
        variables:{ customerId},
        fetchPolicy:"network-only"
      })
     return getCustomerTransactionBalanceByCustomerId   },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_EMPLOYEE_TRANSACTION_BALANCE_BY_CUSTOMER_ID_QUERY_KEY ],
    })
  }

