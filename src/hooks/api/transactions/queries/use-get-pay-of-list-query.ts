import { client } from "@/config/http-client"
import { PAY_OF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_PAY_OFF_LIST } from "@/graphql/queries/GET_PAY_OF_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetPayOffListQuery({page , receiverType}:{page:number , receiverType:"Customer" | "Employee"}) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getPayOffList  }} = await client.query({
        query:GET_PAY_OFF_LIST,
        variables:{page, receiverType},
        fetchPolicy:"network-only"
      })
     return getPayOffList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [PAY_OF_LIST_QUERY_KEY , page, receiverType ],
    })
  }

