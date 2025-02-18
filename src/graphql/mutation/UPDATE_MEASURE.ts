import { gql } from "@apollo/client";

const UPDATE_MEASURE = gql`
  mutation ($measureId: ID!, $name: String!, $description: String) {
    updateMeasure(
      measureId: $measureId
      measureObject: { name: $name, description: $description }
    ) {
      _id
      name
      description
      createdAt
    }
  }
`;
export { UPDATE_MEASURE };
