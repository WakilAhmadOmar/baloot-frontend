import { client } from "@/config/http-client"
import {  GET_EMPLOYEE_PAY_OFF_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_EMPLOYEE_PAY_OFF_LIST } from "@/graphql/queries/GET_EMPLOYEE_PAY_OFF_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetEmployeePayOffListQuery({page }:{page:number }) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getEmployeePayOffList  }} = await client.query({
        query:GET_EMPLOYEE_PAY_OFF_LIST,
        variables:{page},
        fetchPolicy:"network-only"
      })
     return getEmployeePayOffList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_EMPLOYEE_PAY_OFF_LIST_QUERY_KEY , page ],
    })
  }

