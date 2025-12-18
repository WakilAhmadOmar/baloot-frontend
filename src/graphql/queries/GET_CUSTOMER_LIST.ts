import { gql } from "@apollo/client";

const GET_CUSTOMER_LIST = gql`
  query ($page: Int, $searchTerm: String) {
    getCustomerList(page: $page, searchTerm: $searchTerm) {
      customer {
        _id
        fullName
        address
        contactNumber
        createdAt
        isUsed
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
      }
      count
    }
  }
`;
export { GET_CUSTOMER_LIST };
