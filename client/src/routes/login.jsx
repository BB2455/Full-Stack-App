import React, { useEffect } from "react";
import LoginForm from "../components/Login/LoginForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const profile = localStorage.getItem("profile");
  useEffect(() => {
    if (profile) navigate("/", { replace: true });
  }, [navigate, profile]);
  return (
    <div>
      <Row className="justify-content-center">
        <Col lg={4} md={6} sm={7}>
          <h1 className="mb-5">Login</h1>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
