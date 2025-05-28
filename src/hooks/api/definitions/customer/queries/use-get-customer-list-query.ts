import { client } from "@/config/http-client"
import { GET_CUSTOMER_LIST_QUERY_KEY, GET_SAFE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_CUSTOMER_LIST } from "@/graphql/queries/GET_CUSTOMER_LIST";

import { GET_SAFE_LIST } from "@/graphql/queries/GET_SAFE_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetCustomerListQuery({page  }:{page:number }) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getCustomerList   }} = await client.query({
        query:GET_CUSTOMER_LIST,
        variables:{page },
        fetchPolicy:"network-only"
      })
     return getCustomerList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_CUSTOMER_LIST_QUERY_KEY , page ],
    })
  }

