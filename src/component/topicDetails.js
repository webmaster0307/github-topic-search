import { useQuery } from "@apollo/client";
import { Button, Card, Spin } from "antd";
import { StarFilled, LoadingOutlined } from "@ant-design/icons";
import { SEARCH_TOPIC } from "../query";

export const TopicDetails = ({ searchText, onRelatedTopicClick }) => {
  const { loading, error, data } = useQuery(SEARCH_TOPIC, {
    variables: { searchText: `topic:${searchText}` },
  });

  if (loading) {
    return (
      <div className="loading-screen">
        Loading topics, Let us fetch best results for you...
        <Spin size="large" />
      </div>
    );
  }
  if (error) {
    return (
      <p className="loading-screen">
        An unexpected error has been encounter <br/> {error.message}
      </p>
    );
  }

  if (data && data.search.edges && data.search.edges.length === 0) {
    return (
      <p className="loading-screen">
        Oops, No result found ! <br />
        Please try with some different keywords !!{" "}
      </p>
    );
  }

  return (
    <div data-testid="topics-card">
      {data &&
        data.search.edges &&
        data.search.edges.map((edge, index) => (
          <Card
            className="topic-card"
            key={index}
            title={edge.node.resourcePath}
            bordered={true}
          >
            <h3 className="related-topics-heading">Related topics:</h3>
            {edge.node.repositoryTopics.nodes.map((tree, i) => (
              <Button
                key={i}
                data-testid="topics_button"
                className="topics_button"
                onClick={() => {
                  onRelatedTopicClick(tree.topic.name);
                }}
              >
                {tree.topic.name} &nbsp;
                <span className="star_count">
                  <StarFilled />
                  <span className="related-topic">
                    {tree.topic.stargazerCount}
                  </span>
                </span>
              </Button>
            ))}
          </Card>
        ))}
    </div>
  );
};
