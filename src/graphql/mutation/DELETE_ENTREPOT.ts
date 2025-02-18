import { gql } from "@apollo/client";

const DELETE_ENTREPOT = gql`
  mutation ($entrepotId: ID!) {
    deleteEntrepot(entrepotId: $entrepotId) {
      message
    }
  }
`;

export { DELETE_ENTREPOT };
