import { gql } from "@apollo/client";

const DELETE_EXTERNAL_INCOME = gql`
mutation DeleteExternalIncome($externalIncomeId: ID!) {
  deleteExternalIncome(externalIncomeId: $externalIncomeId) {
    message
  }
}
`
export { DELETE_EXTERNAL_INCOME }