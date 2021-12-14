import { useParams } from "react-router-dom";
import React from "react";
import UserForm from "../components/User/UserForm";
import UserInfo from "../components/User/UserInfo";
import { useSelector } from "react-redux";

const User = () => {
  const [editUser, setEditUser] = React.useState(false);
  const users = useSelector((state) => state.users);

  let userId = useParams();
  const currentUser = users.find((user) => user._id === userId.id);
  return (
    <div>
      {currentUser ? (
        <>
          <h1 className="mb-5">User: {userId.id}</h1>
          {editUser ? (
            <UserForm
              Data={currentUser}
              cancelEdit={() => {
                setEditUser(false);
              }}
            />
          ) : (
            <UserInfo
              userData={currentUser}
              editUser={() => {
                setEditUser(true);
              }}
            />
          )}
        </>
      ) : (
        <>
          <h1>No User Found</h1>
        </>
      )}
    </div>
  );
};

export default User;
