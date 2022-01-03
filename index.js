const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const url = "mongodb://localhost:27017/merng-social-media-app";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log("DB Connnection Successfull");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Sever running at ${res.url}`);
  })
  .catch((error) => console.log(error));
