import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/User/UserForm";

const CreateUser = () => {
  const navigate = useNavigate();
  const profile = localStorage.getItem("profile");
  useEffect(() => {
    if (!profile) navigate("/", { replace: true });
  }, [navigate, profile]);
  return (
    <div>
      <h1 className="mb-5">Create User</h1>
      <UserForm />
    </div>
  );
};

export default CreateUser;
