import { client } from "@/config/http-client"
import { GET_RECEIVE_FROM_CUSTOMER_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_RECEIVE_FROM_CUSTOMER_LIST } from "@/graphql/queries/GET_RECEIVE_FROM_CUSTOMER_LIST"
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetReceiveFromCustomerListQuery({page , filter}:{page:number , filter:"Cash"| "ReceiveBill" }) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getReceiveFromCustomerList  }} = await client.query({
        query:GET_RECEIVE_FROM_CUSTOMER_LIST,
        variables:{page, filter},
        fetchPolicy:"network-only"
      })
     return getReceiveFromCustomerList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_RECEIVE_FROM_CUSTOMER_LIST_QUERY_KEY , page ],
    })
  }

