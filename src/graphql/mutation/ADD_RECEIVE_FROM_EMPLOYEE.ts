import { gql } from "@apollo/client";


const ADD_RECEIVE_FROM_EMPLOYEE = gql`
mutation addReceiveFromEmployee($receiveObject:ReceiveObjectInput!){
  addReceiveFromEmployee(receiveObject:$receiveObject){
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
    }
    amount
    calculatedTo{
      _id
      name
    }
    amountCalculated
  }
}
`
export {ADD_RECEIVE_FROM_EMPLOYEE }