// utils/queries.ts
import { gql } from '@apollo/client';

// Fetch user data including comments
export const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      email
      savedJobs {
        jobId
        jobTitle
        companyName
        locationName
        salary
        link
        description
        comment 
      }
    }
  }
`;

// Fetch single user data including comments
export const GET_USER = gql`
  query getSingleUser($id: ID, $username: String) {
    getSingleUser(id: $id, username: $username) {
      _id
      username
      email
      savedJobs {
        jobId
        jobTitle
        companyName
        locationName
        salary
        link
        description
        comment 
      }
    }
  }
`;