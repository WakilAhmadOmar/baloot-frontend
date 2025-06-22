import { gql } from "@apollo/client";

const GET_EMPLOYEE_SALARY_LIST = gql`
query($page:Int!){
  getEmployeeSalaryList(page:$page){
    receive{
      _id
      payerType
      receiver{
        _id
        name
        
      }
      payerId{
        _id
        name
        fullName
      }
      currencyId{
        _id
        name
        symbol
      }
      amount
      createdAt
      description
    }
      count
  }
}
`
export { GET_EMPLOYEE_SALARY_LIST };