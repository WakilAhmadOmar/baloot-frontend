import { gql } from "@apollo/client";

export const ADD_PRE_BUY_BILL = gql`
mutation AddPreBuyBill($preBuyBillObject: BuyBillObjectInput!) {
  addPreBuyBill(preBuyBillObject: $preBuyBillObject) {
    _id
    billNumber
  }
}
`
