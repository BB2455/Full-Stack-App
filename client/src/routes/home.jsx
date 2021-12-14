import React, { useEffect, useState } from "react";
import UserCard from "../components/User/UserCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Home = () => {
  const users = useSelector((state) => state.users);
  const loaded = useSelector((state) => state.loaded);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(loaded);
  }, [loaded]);
  return (
    <>
      <h1 className="mb-5">Home</h1>
      {!isLoaded ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : users.length > 0 ? (
        <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-4">
          {users.map((user) => (
            <Col key={user._id}>
              <UserCard user={user} />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          <h2>No Users Found</h2>
          <Link to="/create" className="btn btn-primary">
            Create New User
          </Link>
        </>
      )}
    </>
  );
};

export default Home;
