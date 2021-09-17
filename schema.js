const {buildSchema} = require('graphql');

const schema = buildSchema(`
     type User {
         id: ID
         name: String
         posts: [Post]
     }
     type Post {
         id: ID
         title: String
         content: String
     }
     input UserInput {
         id: ID
         name: String!
         posts: [PostInput]
     }
     input PostInput {
         id: ID
         title: String!
         content: String!
     }
     type Query {
         getAllUsers: [User]
         getUser(id: ID): User
     }
     type Mutation {
         createUser(user: UserInput): User
     }
`);

module.exports = schema;
