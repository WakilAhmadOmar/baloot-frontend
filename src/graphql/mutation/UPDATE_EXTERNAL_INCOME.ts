import { gql } from "@apollo/client";

const UPDATE_EXTERNAL_INCOME = gql`
mutation UpdateExternalIncome($externalIncomeObject: ExternalIncomeObjectInput!, $externalIncomeId: ID!) {
  updateExternalIncome(externalIncomeObject: $externalIncomeObject, externalIncomeId: $externalIncomeId) {
    _id
    amount
  }
}
`
export { UPDATE_EXTERNAL_INCOME }