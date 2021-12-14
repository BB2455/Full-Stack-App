import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { Link } from "react-router-dom";
import { Person } from "react-bootstrap-icons";

const UserCard = ({ user }) => {
  return (
    <Link
      to={`/user/${user._id}`}
      className="card"
      style={{ textDecoration: "none", color: "#212529" }}
    >
      <Card.Header as="h1" className="text-center">
        <Person />
      </Card.Header>
      <Card.Body>
        <Card.Title className="text-center">{`${user.first_name} ${user.last_name}`}</Card.Title>
        <Card.Title as="h6">Email</Card.Title>
        <ListGroup variant="flush">
          <ListGroupItem>{user.email}</ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Link>
  );
};

export default UserCard;
