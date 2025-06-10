import { gql } from "@apollo/client";

const ADD_BANK_CREDIT = gql`
mutation AddBankCredit($bankId: ID!, $creditObject: [CreditInput]) {
  addBankCredit(bankId: $bankId, creditObject: $creditObject) {
    _id
    accountNumber
    bankPhoneNumber
    createdAt
    description
    credit {
      updatedAt
       amount
      creditType
      currencyId {
        name
        _id
        symbol
      }
    }
    name
  }
}
`
export { ADD_BANK_CREDIT }