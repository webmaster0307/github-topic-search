import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { SEARCH_TOPIC } from "../query";
import { SearchBar } from "./searchBar";

const mocks = [
  {
    request: {
      query: SEARCH_TOPIC,
      variables: {
        name: "react",
      },
    },
    result: {
      data: {
        search: {
          edges: [],
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

it("renders without errors", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SearchBar />
    </MockedProvider>
  );
  expect(await screen.findByTestId("search button")).toBeInTheDocument();
});
