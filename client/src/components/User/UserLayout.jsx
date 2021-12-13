import React from "react";
import Button from "react-bootstrap/Button";

const UserLayout = ({ userData, editUser }) => {
  return (
    <div>
      <h1>{`${userData.first_name} ${userData.last_name}`}</h1>
      <Button variant="warning" onClick={editUser}>
        Edit
      </Button>
    </div>
  );
};

export default UserLayout;
