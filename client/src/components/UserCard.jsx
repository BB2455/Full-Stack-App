import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { Link } from "react-router-dom";
import { Person } from "react-bootstrap-icons";

const UserCard = ({ user }) => {
  return (
    <Link
      to={`/user/${user.id}`}
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

//   "id": "5ab853cc-ebec-4bf9-9e67-74e410e6fc33",
//   "first_name": "Darb",
//   "last_name": "Minney",
//   "email": "dminney0@seattletimes.com",
//   "created_at": "2021-06-07T14:26:06Z"
// }
