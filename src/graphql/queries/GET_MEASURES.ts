import { gql } from "@apollo/client";

const GET_MEASURES = gql`
  query {
    getMeasures {
      _id
      name
      description
      createdAt
      isUsed
    }
  }
`;
export { GET_MEASURES };
