import { gql } from "@apollo/client";

const DELETE_BANK = gql`
  mutation ($bankId: ID!) {
    deleteBank(bankId: $bankId) {
      message
    }
  }
`;
export { DELETE_BANK };
