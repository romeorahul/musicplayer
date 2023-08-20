// lib/apollo-client.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://song-tc.pixelotech.com/graphql", // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

export default client;
