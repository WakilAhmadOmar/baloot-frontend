import { gql } from "@apollo/client";

const GET_PAY_TO_EMPLOYEE_LIST = gql`
query getPayToEmployeeList($page: Int , $filter:PayOffInvoiceType!) {
  getPayToEmployeeList(page: $page , filter:$filter) {
   
    count
    employeePayOff {
    _id
    amount
    amountCalculated
    calculatedTo {
      _id
      name
      symbol
    }  
    createdAt
    currencyId {
      _id
      name,
      symbol
    }
    description
    payerType
    payerId {
      _id
      name
    }
    receiver {
      _id
      name
    }
    }
  }
}
`
export {GET_PAY_TO_EMPLOYEE_LIST}