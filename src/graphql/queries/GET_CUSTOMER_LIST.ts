import { gql } from "@apollo/client";

const GET_CUSTOMER_LIST = gql`
  query ($page: Int, $searchTerm: String) {
    getCustomerList(page: $page, searchTerm: $searchTerm) {
      customer {
        _id
        fullName
        address
        contactNumber
        creditLimit {
          amount
          currencyId{
          _id
          name
          symbol
          }
        }
          credit {
        amount
        creditType
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
export { GET_CUSTOMER_LIST };

// pastBilling {
//   type
//   amount
//   currency {
//     _id
//     name
//   }
// }
