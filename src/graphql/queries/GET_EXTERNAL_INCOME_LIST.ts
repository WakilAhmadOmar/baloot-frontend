import { gql } from "@apollo/client";

const GET_EXTERNAL_INCOME_LIST = gql`
query GetExternalIncomeList($page: Int) {
  getExternalIncomeList(page: $page) {
    externalIncome {
      _id
      amount
      currencyId {
        _id
        name
        symbol
      }
      description
      externalIncomeTypeId {
        _id
        name
      }
      receiver {
        _id
        name

      }
      createdAt
    }
    count
  }
}
`

export {GET_EXTERNAL_INCOME_LIST}