import { gql } from "@apollo/client";


const ADD_SELLS_BILL = gql`
mutation AddSellsBill($sellBillObject: SellBillObjectInput!) {
  addSellsBill(sellBillObject: $sellBillObject) {
    _id
    
  }
}
`

export { ADD_SELLS_BILL }