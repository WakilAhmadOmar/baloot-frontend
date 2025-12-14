import { gql } from "@apollo/client";

const GET_ENTREPOT_LIST = gql`
query GetEntrepotList {
  getEntrepotList {
    _id
    name
    address
    isUsed
    responsible {
      _id
      name
      fathersName
    }

  }
}
`;

export { GET_ENTREPOT_LIST };
