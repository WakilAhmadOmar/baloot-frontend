import { gql } from "@apollo/client";

const GET_BANK_LIST = gql`
  query ($page: Int, $searchTerm: String) {
    getBankList(page: $page, searchTerm: $searchTerm) {
      bank {
        _id
        firstPeriodCredit {
          amount
          creditType
          currencyId {
            _id
            name
            symbol
          }
        }
        name
        accountNumber
        bankPhoneNumber
        createdAt
        description
      }
      count
    }
  }
`;
export { GET_BANK_LIST };
