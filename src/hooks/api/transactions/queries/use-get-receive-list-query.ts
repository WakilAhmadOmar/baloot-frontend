import { client } from "@/config/http-client"
import { RECEIVE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_RECEIVE_LIST } from "@/graphql/queries/GET_RECEIVE_LIST"
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetReceiveListQuery({page , payerType}:{page:number , payerType:"Customer" | "Employee"}) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getReceiveList  }} = await client.query({
        query:GET_RECEIVE_LIST,
        variables:{page, payerType},
        fetchPolicy:"network-only"
      })
     return getReceiveList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [RECEIVE_LIST_QUERY_KEY , page, payerType ],
    })
  }

