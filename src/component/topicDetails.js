import { useQuery } from "@apollo/client";
import { Button, Card } from "antd";
import { StarOutlined, LoadingOutlined } from "@ant-design/icons";
import { SEARCH_TOPIC } from "../query";

export const TopicDetails = ({ searchText, onRelatedTopicClick }) => {
  const { loading, error, data } = useQuery(SEARCH_TOPIC, {
    variables: { searchText: `topic:${searchText}` }
  });

  if (loading) {
    return (
      <div>
        Loading topics, please wait until its fetch..
        <LoadingOutlined />
      </div>
    );
  }
  if (error) {
    return <p>An unexpected error has been encounter {error.message}</p>;
  }

  if (data && data.search.edges && data.search.edges.length === 0) {
    return (
      <p>
        No result found on this search, Please try with some different text
        !!!!!!!
      </p>
    );
  }

  return (
    <>
      {data &&
        data.search.edges &&
        data.search.edges.map((edge, index) => (
          <Card key={index} title={edge.node.resourcePath} bordered={true}>
            Related Topics:
            {edge.node.repositoryTopics.nodes.map((tree, i) => (
              <Button
                key={i}
                className="topics_button"
                onClick={() => {
                  onRelatedTopicClick(tree.topic.name);
                }}
              >
                {tree.topic.name}
                <span className="star_count">
                  <StarOutlined />
                  {tree.topic.stargazerCount}
                </span>
              </Button>
            ))}
          </Card>
        ))}
    </>
  );
};
