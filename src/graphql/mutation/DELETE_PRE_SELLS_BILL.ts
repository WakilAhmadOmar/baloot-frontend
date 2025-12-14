import { gql } from "@apollo/client";

export const DELETE_PRE_SELLS_BILL = gql`
  mutation DeletePreSellsBill($preSellBillId: ID!) {
    deletePreSellsBill(preSellBillId: $preSellBillId) {
      message
    }
  }
`;
