import { gql } from "@apollo/client";

const ADD_PRE_SELLS_BILL = gql`
  mutation AddPreSellsBill($sellBillObject: SellBillObjectInput!) {
    addPreSellsBill(sellBillObject: $sellBillObject) {
      _id
      customerId {
        _id
        fullName
      }
      billNumber
      billDate
    }
  }
`;

export { ADD_PRE_SELLS_BILL };
