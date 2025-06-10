import { gql } from "@apollo/client";

const ADD_SELLS_BILL = gql`
  mutation AddSellsBill($sellBillObject: SellBillObjectInput!) {
    addSellsBill(sellBillObject: $sellBillObject) {
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

export { ADD_SELLS_BILL };
