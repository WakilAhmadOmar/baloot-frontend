import { client } from "@/config/http-client"
import {  GET_CONSUMPTION_TYPE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_CONSUMPTION_TYPE_LIST } from "@/graphql/queries/GET_CONSUMPTION_TYPE_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetConsumptionTypeQuery() {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getConsumptionTypeList  }} = await client.query({
        query:GET_CONSUMPTION_TYPE_LIST,
        fetchPolicy:"network-only"
      })
     return getConsumptionTypeList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_CONSUMPTION_TYPE_LIST_QUERY_KEY ],
    })
  }

