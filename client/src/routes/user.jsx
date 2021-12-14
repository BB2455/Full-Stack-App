import { useParams } from "react-router-dom";
import React from "react";
import UserForm from "../components/User/UserForm";
import UserInfo from "../components/User/UserInfo";

const User = () => {
  const [editUser, setEditUser] = React.useState(false);
  const userData = {
    id: "5ab853cc-ebec-4bf9-9e67-74e410e6fc33",
    first_name: "Darb",
    last_name: "Minney",
    email: "dminney0@seattletimes.com",
    created_at: "2021-06-07T14:26:06Z",
  };

  let userId = useParams();
  return (
    <div>
      <h1 className="mb-5">User: {userId.id}</h1>
      {editUser ? (
        <UserForm
          userData={userData}
          cancelEdit={() => {
            setEditUser(false);
          }}
        />
      ) : (
        <UserInfo
          userData={userData}
          editUser={() => {
            setEditUser(true);
          }}
        />
      )}
    </div>
  );
};

export default User;
