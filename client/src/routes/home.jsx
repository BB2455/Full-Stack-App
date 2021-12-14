import React from "react";
import UserCard from "../components/User/UserCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const users = useSelector((state) => state.users);
  return (
    <>
      <h1 className="mb-5">Home</h1>
      <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-4">
        {users.length > 0 ? (
          users.map((user) => (
            <Col key={user._id}>
              <UserCard user={user} />
            </Col>
          ))
        ) : (
          <>
            <h2>No Users Found</h2>
            <Link to="/create" className="btn btn-primary">
              Create New User
            </Link>
          </>
        )}
      </Row>
    </>
  );
};

export default Home;
