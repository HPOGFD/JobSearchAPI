import { gql } from '@apollo/client';

// This comment is fine because it's outside the GraphQL template literal
export const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      email
      savedJobs {  # Changed from savedBooks to savedJobs
        jobId
        jobTitle
        companyName
        locationName
        salary
      }
    }
  }
`;

// This comment is also fine because it's outside the GraphQL template literal
export const GET_USER = gql`
  query getSingleUser($id: ID, $username: String) {
    getSingleUser(id: $id, username: $username) {
      _id
      username
      email
      savedJobs {  # Changed from savedBooks to savedJobs
        jobId
        jobTitle
        companyName
        locationName
        salary
      }
    }
  }
`;