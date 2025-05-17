import { gql } from "@apollo/client";

const GET_PAY_OFF_LIST = gql`
query GetPayOffList($page: Int, $receiverType: ReceiverTypeForPayOffEnum!) {
  getPayOffList(page: $page, receiverType: $receiverType) {
   
    count
    payOff {
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
    invoiceType
    payerId {
      _id
      name
    }
    payerType
    receiver {
      _id
      name
      fullName
    }
    }
  }
}
`
export {GET_PAY_OFF_LIST}