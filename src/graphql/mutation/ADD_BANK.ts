import { gql } from "@apollo/client";

const ADD_BANK = gql`
  mutation ($bankObject: BankObjectInput!) {
    addBank(bankObject: $bankObject) {
      _id
      name
      accountNumber
      bankPhoneNumber
      createdAt
    }
  }
`;

export { ADD_BANK };
