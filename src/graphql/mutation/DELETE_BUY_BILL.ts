import { gql } from "@apollo/client";

const DELETE_BUY_BILL = gql`
mutation DeleteBuyBill($billId: ID!) {
  deleteBuyBill(billId: $billId) {
    message
  }
}
`

export { DELETE_BUY_BILL }