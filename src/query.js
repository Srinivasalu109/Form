import { gql } from "@apollo/client";

const getRequest = gql`
  query {
    getData {
      id
      Name
      Ph_number
      Gender
      Age
    }
  }
`;
const postRequest = gql`
  mutation postData(
    $id: String
    $Name: String
    $Ph_number: Int
    $Gender: String
    $Age: Int
  ) {
    postData(
      id: $id
      Name: $Name
      Ph_number: $Ph_number
      Gender: $Gender
      Age: $Age
    ) {
      id
      Name
      Ph_number
      Gender
      Age
    }
  }
`;
const updateRequest = gql`
  mutation updateRequest(
    $id: String!
    $Ph_number: Int
    $Gender: String
    $Age: Int
  ) {
    updateData(id: $id, Ph_number: $Ph_number, Gender: $Gender, Age: $Age) {
      id
      Name
      Ph_number
      Gender
      Age
    }
  }
`;
const deleteRequest = gql`
  mutation deleteRequest($id: String!) {
    deleteData(id: $id) {
      id
    }
  }
`;
export { getRequest, postRequest, updateRequest, deleteRequest };
