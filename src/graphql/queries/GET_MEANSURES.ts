import { gql } from "@apollo/client";

const GET_MEANSURES = gql`
  query {
    getMeasures {
      _id
      name
      description
      createdAt
    }
  }
`;
export { GET_MEANSURES };
