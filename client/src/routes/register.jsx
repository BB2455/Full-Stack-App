import React, { useEffect } from "react";
import RegisterForm from "../components/Register/RegisterForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const profile = localStorage.getItem("profile");
  useEffect(() => {
    if (profile) navigate("/", { replace: true });
  }, [navigate, profile]);
  return (
    <div>
      <Row className="justify-content-center">
        <Col lg={4} md={6} sm={7}>
          <h1 className="mb-5">Sign Up</h1>
          <RegisterForm />
          <h6 className="mt-3">Already have a account? <Link to="/login">Sign In Here</Link></h6>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
