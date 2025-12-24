import { gql } from "@apollo/client";

export const UPDATE_BUY_BILL = gql`
  mutation UpdateBuyBill($billId: ID!, $buyBillObject: BuyBillObjectInput!) {
    updateBuyBill(billId: $billId, buyBillObject: $buyBillObject) {
      _id
      billNumber
    }
  }
`;
