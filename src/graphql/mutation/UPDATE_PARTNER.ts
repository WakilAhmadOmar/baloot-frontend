import { gql } from "@apollo/client";

const UPDATE_PARTNER = gql`
  mutation ($partnerId: ID!, $partnerObject: PartnerObjectInput!) {
    updatePartner(partnerId: $partnerId, partnerObject: $partnerObject) {
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
export { UPDATE_PARTNER };
