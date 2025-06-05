import { gql } from "@apollo/client";

const GET_EMPLOYEE_PAY_OFF_LIST = gql`
query GetEmployeePayOffList($page: Int ) {
  getEmployeePayOffList(page: $page) {
   
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
export {GET_EMPLOYEE_PAY_OFF_LIST}