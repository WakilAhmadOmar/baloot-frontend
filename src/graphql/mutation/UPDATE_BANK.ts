import { gql } from "@apollo/client";

const UPDATE_BANK = gql`
  mutation ($bankId: ID!, $bankObject: BankObjectInput!) {
    updateBank(bankId: $bankId, bankObject: $bankObject) {
      message
    }
  }
`;
export { UPDATE_BANK };
