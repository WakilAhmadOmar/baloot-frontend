import { gql } from "@apollo/client";

const UPDATE_SAFE = gql`
  mutation ($safeId: ID!, $safeObject: SafeObjectInput!) {
    updateSafe(safeId: $safeId, safeObject: $safeObject) {
      message
    }
  }
`;
export { UPDATE_SAFE };
