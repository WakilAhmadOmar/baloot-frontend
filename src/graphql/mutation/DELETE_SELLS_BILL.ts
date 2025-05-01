import { gql } from "@apollo/client";


const DELETE_SELLS_BILL =  gql `
mutation DeleteSellsBill($sellBillId: ID!) {
  deleteSellsBill(sellBillId: $sellBillId) {
    message
  }
}
`

export { DELETE_SELLS_BILL}