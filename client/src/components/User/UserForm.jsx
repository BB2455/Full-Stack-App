import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UserForm = ({ userData, cancelEdit }) => {
  let newForm = true;
  if (userData) {
    newForm = false;
  }

  const [userFirstName, setUserFirstName] = React.useState(
    newForm ? "" : userData.first_name
  );
  const [userLastName, setUserLastName] = React.useState(
    newForm ? "" : userData.last_name
  );
  const [userEmail, setUserEmail] = React.useState(
    newForm ? "" : userData.email
  );

  const firstNameChange = (e) => {
    setUserFirstName(e.target.value);
  };

  const lastNameChange = (e) => {
    setUserLastName(e.target.value);
  };

  const emailChange = (e) => {
    setUserEmail(e.target.value);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="First Name"
          value={userFirstName}
          onChange={firstNameChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Last Name"
          value={userLastName}
          onChange={lastNameChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={emailChange}
        />
      </Form.Group>
      {!newForm && (
        <>
          <Form.Group className="mb-3" controlId="formCreatedOn">
            <Form.Label>Created On</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={userData.created_at}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formID">
            <Form.Label>User ID</Form.Label>
            <Form.Control plaintext readOnly defaultValue={userData.id} />
          </Form.Group>
        </>
      )}
      <Button variant="outline-primary" type="submit">
        {newForm ? "Create User" : "Save Changes"}
      </Button>
      {!newForm && (
        <>
          <Button
            className="mx-3"
            variant="outline-secondary"
            onClick={cancelEdit}
          >
            Cancel
          </Button>
          <Button variant="outline-danger">Delete</Button>
        </>
      )}
    </Form>
  );
};

export default UserForm;

//   "id": "5ab853cc-ebec-4bf9-9e67-74e410e6fc33",
//   "first_name": "Darb",
//   "last_name": "Minney",
//   "email": "dminney0@seattletimes.com",
//   "created_at": "2021-06-07T14:26:06Z"
