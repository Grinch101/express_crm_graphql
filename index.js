require("dotenv/config");
const app = require("express")();
const getClient = require("./middleware.js");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");

app.use(getClient);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
