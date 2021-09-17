const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const { readFileSync } = require('fs');
const { buildSchema } = require('graphql');

const users = [
  { id: 1, name: 'Gleb' },
  { id: 2, name: 'John' },
  { id: 3, name: 'Aleksei' },
];

const schemaString = readFileSync('./schema.graphql', { encoding: 'utf8' });
const schema = buildSchema(schemaString);

const resolvers = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id === id);
  },
  createUser: ({ user }) => {
    const id = Date.now();
    const newUser = { id, ...user };
    users.push(newUser);
    return newUser;
  },
};
const app = express();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: resolvers,
  }),
);

app.listen(3003, () => console.log('Server started on port 3003'));
