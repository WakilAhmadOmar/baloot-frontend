import { gql } from "@apollo/client";

const DELETE_PRE_BUY_BILL = gql`
mutation DeletePreBuyBill($preBuyBillId: ID!) {
  deletePreBuyBill(preBuyBillId: $preBuyBillId) {
    message
  }
}
`

export { DELETE_PRE_BUY_BILL }