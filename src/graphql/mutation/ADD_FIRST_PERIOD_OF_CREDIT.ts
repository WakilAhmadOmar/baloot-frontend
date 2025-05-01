import { gql } from "@apollo/client";

const ADD_FIRST_PERIOD_OF_CREDIT = gql`
  mutation AddFirstPeriodOfCredit(
    $description: String
    $accountType: AccountCreditType!
    $creditObject: [AccountCreditInput]
    $accountId: ID!
  ) {
    addFirstPeriodOfCredit(
      description: $description
      accountType: $accountType
      creditObject: $creditObject
      accountId: $accountId
    ) {
      message
    }
  }
`;
export {ADD_FIRST_PERIOD_OF_CREDIT}