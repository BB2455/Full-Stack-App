import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserCard from "./UserCard";
import Pagination from "../Pagination";

const UsersContainer = () => {
  const { users, currentPage, numberOfPages } = useSelector(
    (state) => state.users
  );
  const location = useLocation();

  const getSearchLocation = () => {
    if (location.search) {
      const newLocation = location.search.replace(/\?page=\d+|&page=\d+/gi, "");
      if (!newLocation) return "?page=";
      return newLocation + "&page=";
    } else {
      return "?page=";
    }
  };

  return (
    <>
      <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-4">
        {users.map((user) => (
          <Col key={user._id}>
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        urlLink={`${location.pathname}${getSearchLocation()}`}
      />
    </>
  );
};

export default UsersContainer;
