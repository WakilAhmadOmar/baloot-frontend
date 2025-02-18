import { gql } from "@apollo/client";

const UPDATE_USER_CURRENCY_STATUS = gql`
  mutation ($currencyId: ID!, $isActive: Boolean!) {
    updateUserCurrencyStatus(currencyId: $currencyId, isActive: $isActive) {
      _id
      name
      isActive
    }
  }
`;
export { UPDATE_USER_CURRENCY_STATUS };
