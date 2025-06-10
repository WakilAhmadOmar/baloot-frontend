import { client } from "@/config/http-client"
import { GET_CONSUMPTION_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_CONSUMPTION_LIST } from "@/graphql/queries/GET_CONSUMPTION_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetConsumptionListQuery({page , searchTerm }:{page:number , searchTerm?:string}) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getConsumptionList  }} = await client.query({
        query:GET_CONSUMPTION_LIST,
        variables:{page, },
        fetchPolicy:"network-only"
      })
     return getConsumptionList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_CONSUMPTION_LIST_QUERY_KEY , page, searchTerm ],
    })
  }

