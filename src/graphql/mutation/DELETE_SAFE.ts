import { gql } from "@apollo/client";

const DELETE_SAFE = gql`
  mutation ($safeId: ID!) {
    deleteSafe(safeId: $safeId) {
      message
    }
  }
`;

export { DELETE_SAFE };
