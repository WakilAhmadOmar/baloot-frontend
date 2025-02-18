import { gql } from "@apollo/client";

const DELETE_USER_CURRENCY = gql`
  mutation ($currencyId: ID!) {
    deleteUserCurrency(currencyId: $currencyId) {
      message
    }
  }
`;

export { DELETE_USER_CURRENCY };
