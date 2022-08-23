import { useState } from "react";
import "./App.css";
import { Col, Row, Space } from "antd";
import { SearchBar, TopicDetails } from "./component";

function App() {
  const [searchText, setSearchText] = useState("react");

  const onSearch = (text) => {
    setSearchText(text);
  };

  return (
    <div className="App">
      <div className="main_container">
        <Row justify="center">
          <Col span={20}>
            <SearchBar searchText={searchText} onSearch={onSearch} />
            <div className="current-topic-wrapper">
              <h1 className="current-topic">
                Topic Name: &nbsp; <span>"{searchText}"</span>
              </h1>
            </div>
            <TopicDetails
              searchText={searchText}
              onRelatedTopicClick={onSearch}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
