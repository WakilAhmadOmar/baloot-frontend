import { client } from "@/config/http-client"
import { RECEIVE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_RECEIVE_LIST } from "@/graphql/queries/GET_RECEIVE_LIST"
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetReceiveListQuery({page}:{page:number}) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getReceiveList  }} = await client.query({
        query:GET_RECEIVE_LIST,
        variables:{page},
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
      queryKey: [RECEIVE_LIST_QUERY_KEY , page ],
    })
  }

