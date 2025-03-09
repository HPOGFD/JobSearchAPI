import gql from 'graphql-tag';
const typeDefs = gql `
  type User {
    _id: ID!
    username: String!
    email: String!
    savedJobs: [Job]
    jobCount: Int
  }

  type Job {
    jobId: String!
    jobTitle: String!
    companyName: String!
    locationName: String
    salary: String
    link: String
    description: String
    comment: String
    status: String
  }

  type Auth {
    token: String!
    user: User!
  }

  input JobInput {
    jobId: String!
    jobTitle: String!
    companyName: String!
    locationName: String # Optional to match Job?
    salary: String
    description: String
    link: String
    status: String

 }

  type Query {
    getSingleUser(id: ID, username: String): User
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveJob(jobInput: JobInput!): User
    deleteJob(jobId: String!): User
    addComment(jobId: String!, comment: String!): Job
    updateJobStatus(jobId: ID!, status: String!): Job
  }
`;
export default typeDefs;
