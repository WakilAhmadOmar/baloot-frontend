import { gql } from "@apollo/client";

const UPDATE_ENTREPOT = gql`
  mutation ($entrepotId: ID!, $entrepotObject: EntrepotObjectInput!) {
    updateEntrepot(entrepotId: $entrepotId, entrepotObject: $entrepotObject) {
      message
    }
  }
`;
export { UPDATE_ENTREPOT };
