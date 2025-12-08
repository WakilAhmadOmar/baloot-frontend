import { client } from "@/config/http-client"
import {  GET_ALL_ENTREPOTS_VALID_PRODUCTS_QUERY_KEY } from "@/constants/queries-key";
import { GET_ALL_ENTREPOTS_VALID_PRODUCTS } from "@/graphql/queries/GET_ALL_ENTREPOTS_VALID_PRODUCTS";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetAllEntrepotsValidProductsQuery({page , limit=10  }:{page:number , limit?:number }) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getAllEntrepotsValidProducts  }} = await client.query({
        query:GET_ALL_ENTREPOTS_VALID_PRODUCTS,
        variables:{page, limit },
        fetchPolicy:"network-only"
      })
     return getAllEntrepotsValidProducts
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_ALL_ENTREPOTS_VALID_PRODUCTS_QUERY_KEY , page ],
    })
  }
