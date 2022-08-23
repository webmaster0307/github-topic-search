import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { SEARCH_TOPIC } from "../query";
import { TopicDetails } from "./topicDetails";

const mocks = [
  {
    request: {
      query: SEARCH_TOPIC,
      variables: {
        searchText: "topic:%",
      },
    },
    result: {
      data: {
        search: {
          repositoryCount: 456,
          edges: [
            {
              node: {
                resourcePath: "",
                repositoryTopics: {
                  nodes: {
                    topic: {
                      name: "react",
                      stargazerCount: 345,
                      relatedTopics: {
                        name: "reactjs",
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
];

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

it("renders with MockedProvider", async () => {
  const { queryByTestId, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TopicDetails />
    </MockedProvider>
  );

  expect(
    getByText("Loading topics, Let us fetch best results for you...")
  ).toBeInTheDocument();
  expect(queryByTestId("topics-card")).not.toBeInTheDocument();
});
