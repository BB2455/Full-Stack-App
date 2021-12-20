import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getPostsBySearch } from "../../actions/users";
import UsersContainer from "../User/UsersContainer";

const SearchFilter = () => {
  const defaultSearchQuery = {
    search: "",
    filterBy: "firstAndLast",
    startDate: "",
    endDate: "",
    orderType: "relevancy",
    order: "ascending",
  };

  const { users, results, isLoading, error } = useSelector(
    (state) => state.users
  );
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const [searchQueried, setSearchQueried] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newSearchURL = "";
    for (const key in searchQuery) {
      if (!newSearchURL) {
        if (searchQuery[key]) {
          newSearchURL = `?${key.toString()}=${encodeURIComponent(
            searchQuery[key].toString().trim()
          )}`;
        }
      } else {
        if (searchQuery[key]) {
          newSearchURL =
            newSearchURL +
            `&${key.toString()}=${encodeURIComponent(
              searchQuery[key].toString().trim()
            )}`;
        }
      }
    }
    newSearchURL = newSearchURL + "&page=1";
    navigate(`/search${newSearchURL}`);
  };

  useEffect(() => {
    if (location.search) {
      setSearchQueried(true);
      dispatch(getPostsBySearch({ url: location.search }));
      return;
    }
    setSearchQueried(false);
    //eslint-disable-next-line
  }, [location]);

  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-5">
        <Form.Group className="mb-3" controlId="formSearchBar">
          <Form.Control
            name="search"
            autoComplete="off"
            type="text"
            placeholder="Search..."
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSearchFor">
          <Form.Label>Search Name By</Form.Label>
          <FloatingLabel controlId="floatingSearchFor" label="Search By">
            <Form.Select
              aria-label="Search By Selector"
              name="filterBy"
              onChange={handleChange}
            >
              <option value="firstAndLast">First And Last Name</option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTimeRange">
          <Form.Label>Search Time Created At</Form.Label>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingTimeRangeStart"
                label="Start Date"
              >
                <Form.Control
                  name="startDate"
                  type="date"
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingTimeRangeEnd" label="End Date">
                <Form.Control
                  name="endDate"
                  type="date"
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formOrder">
          <Form.Label>Results Order</Form.Label>
          <Row>
            <Col>
              <Form.Select
                aria-label="Search By Selector"
                name="orderType"
                onChange={handleChange}
              >
                <option value="relevancy">Relevancy</option>
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="created_at">Created At</option>
                <option value="updated_at">Updated At</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                aria-label="Search By Selector"
                name="order"
                onChange={handleChange}
              >
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Search
          </Button>
        </div>
      </Form>
      {!searchQueried ? null : isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : users.length > 0 ? (
        <>
          <h3 className="mb-3">Results: {results}</h3>
          <UsersContainer />
        </>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <h2>No Results Found</h2>
      )}
    </>
  );
};

export default SearchFilter;
