import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultForm = { username: "", password: "" };
  const [formData, setForm] = useState(defaultForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
  };

  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formUserName">
        <FloatingLabel controlId="floatingUsername" label="Username">
          <Form.Control
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
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
