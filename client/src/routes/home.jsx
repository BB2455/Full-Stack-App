import React, { useEffect } from "react";
import UserCard from "../components/User/UserCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { getUsers } from "../actions/users";
import UsersPagination from "../components/UsersPagination";

const Home = () => {
  const { users, isLoading, currentPage, numberOfPages } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const profile = localStorage.getItem("profile");
  let [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  useEffect(() => {
    console.log(page);
    dispatch(getUsers(page));
    //eslint-disable-next-line
  }, []);

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
        <>
          <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-4">
            {users.map((user) => (
              <Col key={user._id}>
                <UserCard user={user} />
              </Col>
            ))}
          </Row>
          <UsersPagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
          />
        </>
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
