import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import UserForm from "../components/User/UserForm";
import UserInfo from "../components/User/UserInfo";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../actions/users";
import Spinner from "react-bootstrap/Spinner";

const User = () => {
  const [editUser, setEditUser] = React.useState(false);
  const { user, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id));
    //eslint-disable-next-line
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : user ? (
        <>
          <h1 className="mb-5">User: {id}</h1>
          {editUser ? (
            <UserForm
              Data={user}
              cancelEdit={() => {
                setEditUser(false);
              }}
            />
          ) : (
            <UserInfo
              userData={user}
              editUser={() => {
                setEditUser(true);
              }}
            />
          )}
        </>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <h1>No User Found</h1>
      )}
    </div>
  );
};

export default User;
