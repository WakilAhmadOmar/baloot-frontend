import { gql } from "@apollo/client";

const UPDATE_SELLS_BILL = gql`
mutation UpdateSellsBill($sellBillId: ID!, $sellBillObject: SellBillObjectInput!) {
  updateSellsBill(sellBillId: $sellBillId, sellBillObject: $sellBillObject) {
    _id
    billNumber
  }
}
` 

export { UPDATE_SELLS_BILL };