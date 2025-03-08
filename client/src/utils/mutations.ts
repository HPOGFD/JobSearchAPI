import { gql } from '@apollo/client';

// Get logged-in user's data
export const GET_ME = gql`
  query Me {
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
        description
        link
      }
    }
  }
`;

// Get a single user by ID or username
export const GET_USER = gql`
  query GetSingleUser($id: ID, $username: String) {
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
        description
        link
      }
    }
  }
`;

// User signup
export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// User login
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Save a job
export const SAVE_JOB = gql`
  mutation SaveJob($jobInput: JobInput!) {
    saveJob(jobInput: $jobInput) {
      _id
      username
      savedJobs {
        jobId
        jobTitle
        companyName
        locationName
        salary
        description
        link
      }
    }
  }
`;

// Delete a job
export const DELETE_JOB = gql`
  mutation DeleteJob($jobId: String!) {
    deleteJob(jobId: $jobId) {
      _id
      username
      savedJobs {
        jobId
        jobTitle
        companyName
        locationName
        salary
        description
        link
      }
    }
  }
`;
