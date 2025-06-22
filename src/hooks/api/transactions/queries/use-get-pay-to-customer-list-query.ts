import { client } from "@/config/http-client"
import { GET_PAY_TO_CUSTOMER_LIST_QUERY_KEY } from "@/constants/queries-key";
import {  GET_PAY_TO_CUSTOMER_LIST } from "@/graphql/queries/GET_PAY_TO_CUSTOMER_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetPayToCustomerListQuery({page }:{page:number}) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getPayToCustomerList  }} = await client.query({
        query:GET_PAY_TO_CUSTOMER_LIST,
        variables:{page},
        fetchPolicy:"network-only"
      })
     return getPayToCustomerList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_PAY_TO_CUSTOMER_LIST_QUERY_KEY , page ],
    })
  }

