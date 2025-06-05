import { gql } from "@apollo/client";

const GET_MEASURES = gql`
  query {
    getMeasures {
      _id
      name
      description
      createdAt
    }
  }
`;
export { GET_MEASURES };
