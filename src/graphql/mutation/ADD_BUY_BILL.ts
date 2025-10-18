import { gql } from "@apollo/client";

const ADD_BUY_BILL = gql`
mutation AddBuyBill($buyBillObject: BuyBillObjectInput!) {
  addBuyBill(buyBillObject: $buyBillObject) {
    _id
    billNumber
  }
}
`;

export { ADD_BUY_BILL };
