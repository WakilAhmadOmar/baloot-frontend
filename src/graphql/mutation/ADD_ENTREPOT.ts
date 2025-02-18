import { gql } from "@apollo/client";

const ADD_ENTREPOT = gql`
  mutation ($entrepotObject: EntrepotObjectInput!) {
    addEntrepot(entrepotObject: $entrepotObject) {
      _id
      name
      address
      responsible {
        _id
        name
      }
      createdAt
    }
  }
`;

export { ADD_ENTREPOT };
