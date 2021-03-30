const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  scalar FileUpload

  type Error {
    validatorKey: String!
    path: String!
    message: String!
  }

  type User {
    id: Int!
    username: String!
    email: String!
    image: String!
    createdAt: String!
    updatedAt: String!
  }

  input UserInput {
    email: String!
    username: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    password: String
    image: String
  }

  type UsersResponse {
    ok: Boolean!
    users: [User]
    errors: [Error]
    message: String
  }
  
  type UserResponse {
    ok: Boolean!
    user: User
    errors: [Error]
    message: String
  }

  type MessageResponse {
    ok: Boolean!
    message: String!
  }

  type AuthData {
    value: String!
    user_id: Int!
  }
  
  type AuthDataResponse {
    ok: Boolean!
    token: AuthData
    errors: [Error]
    message: String
  }
  
  type Response {
    ok: Boolean!
  }

  type Query {
    getUsers: UsersResponse!,
    getUser(id: Int): UserResponse!
    login(email: String!, password: String!): AuthDataResponse!
  }

  type Mutation {
    createUser(fields: UserInput!): AuthDataResponse!
    updateUser(id: Int, fields: UpdateUserInput!): UserResponse!
    removeUser(id: Int): UserResponse!
    uploadImage(image: FileUpload!): Response!
    logout: MessageResponse!
  }
`)
