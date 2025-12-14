import { gql } from "@apollo/client";

const GET_PARTNER_LIST = gql`
query GetPartnerList {
  getPartnerList {
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
    isUsed
    contactNumber
    createdAt
  }
}
`;
export { GET_PARTNER_LIST };
