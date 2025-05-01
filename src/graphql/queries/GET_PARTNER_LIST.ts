import { gql } from "@apollo/client";

const GET_PARNER_LIST = gql`
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
        phoneNumber
        createdAt
      }
      count
    }
  }
`;
export { GET_PARNER_LIST };
