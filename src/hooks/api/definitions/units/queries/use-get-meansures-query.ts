import { client } from "@/config/http-client"
import { GET_MEASURES_QUERY_KEY } from "@/constants/queries-key";
import { GET_MEASURES } from "@/graphql/queries/GET_MEASURES";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetMeasuresQuery() {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getMeasures   }} = await client.query({
        query:GET_MEASURES,
        fetchPolicy:"network-only"
      })
     return getMeasures
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_MEASURES_QUERY_KEY  ],
    })
  }

