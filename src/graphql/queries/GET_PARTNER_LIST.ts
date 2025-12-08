import { gql } from "@apollo/client";

const GET_PARTNER_LIST = gql`
  query ($page: Int!, $searchTerm: String) {
    getPartnerList(page: $page, searchTerm: $searchTerm) {
      partner {
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
        createdAt
      }
      count
    }
  }
`;
export { GET_PARTNER_LIST };
