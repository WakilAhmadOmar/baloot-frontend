import { client } from "@/config/http-client"
import {  GET_EMPLOYEE_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_EMPLOYEE_LIST } from "@/graphql/queries/GET_EMPLOYEE_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetEmployeeListQuery() {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getEmployeeList   }} = await client.query({
        query:GET_EMPLOYEE_LIST,
        fetchPolicy:"network-only"
      })
     return getEmployeeList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_EMPLOYEE_LIST_QUERY_KEY ],
    })
  }

