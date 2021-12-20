import React, { useEffect } from "react";
import UsersContainer from "../components/User/UsersContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import { getUsers } from "../actions/users";
import Spinner from "react-bootstrap/Spinner";

const Home = () => {
  const { users, error, isLoading } = useSelector((state) => state.users);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const profile = localStorage.getItem("profile");

  const page = searchParams.get("page") || 1;

  useEffect(() => {
    dispatch(getUsers(page));
    //eslint-disable-next-line
  }, [location]);

  return (
    <>
      <h1 className="mb-5">Home</h1>

      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : users.length > 0 ? (
        <UsersContainer />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <h2>No Users Found</h2>
          {profile && (
            <Link to="/create" className="btn btn-primary">
              Create New User
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default Home;
