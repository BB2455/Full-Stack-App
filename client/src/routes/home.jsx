import React, { useEffect } from "react";
import UserCard from "../components/User/UserCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { getUsers } from "../actions/users";
import Pagination from "../components/Pagination";

const Home = () => {
  const { users, isLoading, currentPage, numberOfPages } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const profile = localStorage.getItem("profile");
  let [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
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
        <>
          <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-4">
            {users.map((user) => (
              <Col key={user._id}>
                <UserCard user={user} />
              </Col>
            ))}
          </Row>
          <Pagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            urlLink="/?page="
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
