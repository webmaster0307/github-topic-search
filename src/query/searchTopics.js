import { gql } from "@apollo/client";

export const SEARCH_TOPIC = gql`
  query GetTopics($searchText: String!) {
    search(query: $searchText, type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            resourcePath
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                  stargazerCount
                  relatedTopics {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
