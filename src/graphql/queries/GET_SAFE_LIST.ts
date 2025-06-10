import { gql } from "@apollo/client";

const GET_SAFE_LIST = gql`
  query GetSafeList($page: Int, $searchTerm: String) {
  getSafeList(page: $page, searchTerm: $searchTerm) {
    count
    safe {
      _id
      name
      description
      firstPeriodCredit {
      amount
      creditType
      currencyId {
        _id
        name
        symbol
      }
     }
      cashier {
        _id
        address
        createdAt
        name
        phoneNumber
      }
    }
  }
}
`;
export { GET_SAFE_LIST };
