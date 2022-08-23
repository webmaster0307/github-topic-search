import { Input, Row, Col } from "antd";
import React, { useEffect, useState } from "react";

const { Search } = Input;

export const SearchBar = ({ onSearch, searchText }) => {
  const [text, setText] = useState(searchText);

  useEffect(() => {
    setText(searchText);
  }, [searchText]);
  return (
    <Row span={24} className="header-container">
      <Col span={16}>
        <h2 className="heading">Search For Topics</h2>
      </Col>
      <Col span={8}>
        <Search
          value={text}
          data-testid = "search button"
          size="large"
          enterButton="Search"
          placeholder="Search For Topics"
          onSearch={onSearch}
          onChange={(e) => setText(e.target.value)}
        />
      </Col>
    </Row>
  );
};
