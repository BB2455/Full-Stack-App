import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { createUser, updateUser, deleteUser } from "../../actions/users";
import { useNavigate } from "react-router-dom";

const UserForm = ({ Data, cancelEdit }) => {
  let newForm = true;
  let defaultUserData = {
    first_name: "",
    last_name: "",
    email: "",
    created_at: "",
    id: "",
  };
  if (Data) {
    newForm = false;
    defaultUserData = Data;
  }

  const [userData, setUserData] = useState(defaultUserData);
  const [res, setRes] = useState({ message: "", error: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRes = (res) => {
    setRes(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newForm) {
      dispatch(createUser(userData, handleRes));
    } else {
      dispatch(updateUser(userData._id, userData, handleRes)).then(() => {
        if (!res.error) return cancelEdit();
      });
    }
  };

  const handleDelete = () => {
    dispatch(deleteUser(userData._id));
    navigate("/", { replace: true });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          autoComplete="off"
          required
          type="text"
          placeholder="First Name"
          name="first_name"
          value={userData.first_name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          autoComplete="off"
          required
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={userData.last_name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          autoComplete="off"
          required
          type="email"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        {res.message.length > 0 && newForm && (
          <Form.Text className={res.error ? "text-danger" : "text-success"}>
            {res.message}
          </Form.Text>
        )}
      </Form.Group>
      {!newForm && (
        <>
          <Form.Group className="mb-3" controlId="formCreatedOn">
            <Form.Label>Created On</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={userData.createdAt}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formID">
            <Form.Label>User ID</Form.Label>
            <Form.Control plaintext readOnly defaultValue={userData._id} />
            {res.message.length > 0 && !newForm && (
              <Form.Text className={res.error ? "text-danger" : "text-success"}>
                {res.message}
              </Form.Text>
            )}
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
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
        </>
      )}
    </Form>
  );
};

export default UserForm;
