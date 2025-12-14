import { gql } from "@apollo/client";

export const DELETE_EXTERNAL_INCOME_TYPE = gql`
mutation DeleteExternalIncomeType($externalIncomeTypeId: ID!) {
  deleteExternalIncomeType(externalIncomeTypeId: $externalIncomeTypeId) {
    _id
    name
    isUsed
    createdAt
  }
}
`