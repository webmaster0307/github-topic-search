import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_TOKEN}`
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        "gq-error"
      )
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`, "cjecckk");
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

export default client;
