import { client } from "@/config/http-client"
import {GET_RECEIVE_FROM_EMPLOYEE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_RECEIVE_FROM_EMPLOYEE_LIST } from "@/graphql/queries/GET_RECEIVE_FROM_EMPLOYEE_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetReceiveFromEmployeeListQuery({page , }:{page:number }) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getReceiveFromEmployeeList  }} = await client.query({
        query:GET_RECEIVE_FROM_EMPLOYEE_LIST,
        variables:{page},
        fetchPolicy:"network-only"
      })
     return getReceiveFromEmployeeList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_RECEIVE_FROM_EMPLOYEE_LIST_QUERY_KEY , page ],
    })
  }

