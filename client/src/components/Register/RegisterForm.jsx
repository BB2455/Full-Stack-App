import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useDispatch } from "react-redux";
import { register } from "../../actions/auth";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultForm = { username: "", email: "", password: "", confirmPassword: "" };
  const [formData, setForm] = useState(defaultForm);
  const [error, setError] = useState("");

  const errorHandler = (errorMessage) => {
    const errorCode = errorMessage.match(/\d+/);
    switch (errorCode[0]) {
      case "409":
        setError("Admin already exists, please try again.");
        return;
      default:
        setError("Something went wrong, please try again later.");
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords Must Match")
    }
    dispatch(register(formData, navigate, errorHandler));
  };

  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formUsername">
        <FloatingLabel controlId="floatingUsername" label="Username">
          <Form.Control
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <FloatingLabel controlId="floatingEmail" label="Email">
          <Form.Control
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password">
          <Form.Control
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        {error && (
          <Form.Text id="loginError" className="text-danger">
            {error}
          </Form.Text>
        )}
      </Form.Group>
      <div className="d-grid">
        <Button variant="outline-primary" type="submit">
          Register
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
