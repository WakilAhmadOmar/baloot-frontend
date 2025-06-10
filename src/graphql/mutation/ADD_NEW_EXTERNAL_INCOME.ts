import { gql } from "@apollo/client";

const ADD_NEW_EXTERNAL_INCOME = gql`
mutation AddNewExternalIncome($externalIncomeObject: ExternalIncomeObjectInput!) {
  addNewExternalIncome(externalIncomeObject: $externalIncomeObject) {
    _id
    amount
  }
}
`
export {ADD_NEW_EXTERNAL_INCOME}