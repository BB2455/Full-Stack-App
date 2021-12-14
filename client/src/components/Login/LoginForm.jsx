import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const LoginForm = () => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Form.Group className="mb-3" controlId="formUserName">
        <FloatingLabel controlId="floatingUsername" label="Username">
          <Form.Control placeholder="Username" />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control placeholder="Password" />
        </FloatingLabel>
      </Form.Group>
      <div className="d-grid">
        <Button variant="outline-primary" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
