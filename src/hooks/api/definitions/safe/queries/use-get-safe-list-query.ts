import { client } from "@/config/http-client"
import { GET_SAFE_LIST_QUERY_KEY } from "@/constants/queries-key";

import { GET_SAFE_LIST } from "@/graphql/queries/GET_SAFE_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetSafeListQuery() {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getSafeList   }} = await client.query({
        query:GET_SAFE_LIST,
        fetchPolicy:"network-only"
      })
     return getSafeList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_SAFE_LIST_QUERY_KEY  ],
    })
  }

