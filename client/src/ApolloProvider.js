import { setContext } from "@apollo/client/link/context";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { getUserDataFromMemory } from "./utils/getUserData";
const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
  request: (operation) => {
    const {token} = getUserDataFromMemory();
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  },
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
