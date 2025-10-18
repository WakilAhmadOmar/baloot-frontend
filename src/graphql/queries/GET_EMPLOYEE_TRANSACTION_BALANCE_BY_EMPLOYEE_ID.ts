import { gql } from "@apollo/client/core";

const GET_EMPLOYEE_TRANSACTION_BALANCE_BY_EMPLOYEE_ID = gql`
  query GetEmployeeTransactionBalanceByEmployeeId($employeeId: ID!) {
    getEmployeeTransactionBalanceByEmployeeId(employeeId: $employeeId) {
      currencyId {
        _id
        name
      }
      debitAmount
      creditAmount
    }
  }
`;

export { GET_EMPLOYEE_TRANSACTION_BALANCE_BY_EMPLOYEE_ID };
