const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const resolver = require('./graphql/resolvers');
const schema = require('./graphql/schema');
const isAuth = require('./middleware/isAuth');
const db = require('./models');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {

  });
});