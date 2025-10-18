import { gql } from "@apollo/client";

const GET_EMPLOYEE_REPORTS_BY_EMPLOYEE_ID = gql`
  query GetEmployeeReportsByEmployeeId($employeeId: ID!, $page: Int) {
    getEmployeeReportsByEmployeeId(employeeId: $employeeId, page: $page) {
      list {
        _id
        receiver {
          _id
          fullName
          name
        }
        payerId {
          _id
          fullName
          name
        }
        currencyId {
          _id
          name
        }
        amount
        calculatedTo {
          _id
          name
        }
        amountCalculated
        invoiceType
        billId {
          _id
        }
        description
        payerType
        receiverType
        createdAt
        updatedAt
      }
      count
    }
  }
`;
export { GET_EMPLOYEE_REPORTS_BY_EMPLOYEE_ID }