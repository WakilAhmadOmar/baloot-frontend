import { gql } from "@apollo/client";

const ADD_PARTNER = gql`
  mutation ($partnerObject: PartnerObjectInput!) {
    addPartner(partnerObject: $partnerObject) {
      _id
      firstName
      lastName
      invest {
        amount
        currencyId {
          _id
          name
          symbol
        }
      }
      investPercentage
      phoneNumber
      createdAt
    }
  }
`;

export { ADD_PARTNER };
