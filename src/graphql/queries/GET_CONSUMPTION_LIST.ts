import { gql } from "@apollo/client";

const GET_CONSUMPTION_LIST = gql`
query GetConsumptionList($page: Int, $searchTerm: String) {
  getConsumptionList(page: $page, searchTerm: $searchTerm) {
    consumption {
      _id
      payer {
        _id
        name
        address
      }
      consumptionTypeId {
        _id
        name
      }
      amount
      currencyId {
        _id
        name
        symbol
      }
        description
      createdAt
    }
      count
  }
}
`
export { GET_CONSUMPTION_LIST }