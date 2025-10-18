import { client } from "@/config/http-client";
import { GET_EMPLOYEE_TRANSACTION_BALANCE_BY_EMPLOYEE_ID_QUERY_KEY } from "@/constants/queries-key";
import { GET_EMPLOYEE_TRANSACTION_BALANCE_BY_EMPLOYEE_ID } from "@/graphql/queries/GET_EMPLOYEE_TRANSACTION_BALANCE_BY_EMPLOYEE_ID";
import { AppContext } from "@/provider/appContext";
import { ApolloError } from "@apollo/client";
import { useContext } from "react";
import { useQuery } from "react-query";

export function useGetEmployeeTransactionBalanceByEmployeeIdQuery({
  employeeId,
}: {
  employeeId: string;
}) {
  const { setHandleError } = useContext(AppContext);
  return useQuery({
    queryFn: async () => {
      const {
        data: { getEmployeeTransactionBalanceByEmployeeId },
      } = await client.query({
        query: GET_EMPLOYEE_TRANSACTION_BALANCE_BY_EMPLOYEE_ID,
        variables: { employeeId },
        fetchPolicy: "network-only",
      });
      return getEmployeeTransactionBalanceByEmployeeId;
    },
    onError: (error: ApolloError) => {
      setHandleError({
        open: true,
        type: "error",
        message: error.message,
      });
    },
    queryKey: [GET_EMPLOYEE_TRANSACTION_BALANCE_BY_EMPLOYEE_ID_QUERY_KEY],
  });
}
