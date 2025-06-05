import { gql } from "@apollo/client";

const ADD_MEASURE = gql`
  mutation ($name: String!, $description: String) {
    addMeasure(measureObject: { name: $name, description: $description }) {
      _id
      name
      description
      userId
      createdAt
    }
  }
`;
export { ADD_MEASURE };
