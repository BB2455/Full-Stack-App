import React from "react";
import { UserCard } from "./components";
import data from "./data.json";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  return (
    <>
      <h1 className="mb-5">Home</h1>
      <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-4 mb-5">
        {data.map((user) => (
          <Col key={user.id}>
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default App;
