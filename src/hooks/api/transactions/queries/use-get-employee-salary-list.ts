import { client } from "@/config/http-client"
import { GET_EMPLOYEE_SALARY_LIST_QUERY_KEY } from "@/constants/queries-key";
import { GET_EMPLOYEE_SALARY_LIST } from "@/graphql/queries/GET_EMPLOYEE_SALARY_LIST";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query"


export function useGetEmployeeSalaryListQuery({page }:{page:number}) {
const {setHandleError} = useContext(AppContext)
    return useQuery({
      queryFn: async () => {
        const {data: { getEmployeeSalaryList  }} = await client.query({
        query:GET_EMPLOYEE_SALARY_LIST,
        variables:{page},
        fetchPolicy:"network-only"
      })
     return getEmployeeSalaryList
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open:true,
        type:"error",
        message:error.message
      })
    },
      queryKey: [GET_EMPLOYEE_SALARY_LIST_QUERY_KEY , page ],
    })
  }

