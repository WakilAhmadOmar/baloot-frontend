import { client } from "@/config/http-client"
import { GET_CUSTOMER_PAY_OFF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_CUSTOMER_PAY_OFF_LIST } from "@/graphql/queries/GET_CUSTOMER_PAY_OF_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetCustomerPayOffListQuery({page }:{page:number}) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getCustomerPayOffList  }} = await client.query({
        query:GET_CUSTOMER_PAY_OFF_LIST,
        variables:{page},
        fetchPolicy:"network-only"
      })
     return getCustomerPayOffList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_CUSTOMER_PAY_OFF_LIST_QUERY_KEY , page ],
    })
  }

