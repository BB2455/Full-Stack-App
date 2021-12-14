import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const SearchFilter = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formSearchBar">
        <Form.Control autoComplete="off" type="text" placeholder="Search..." />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSearchFor">
        <Form.Label>Search Name By</Form.Label>
        <FloatingLabel controlId="floatingSearchFor" label="Search By">
          <Form.Select aria-label="Search By Selector">
            <option value="none">First And Last Name</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
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
              <Form.Control type="date" />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingTimeRangeEnd" label="End Date">
              <Form.Control type="date" />
            </FloatingLabel>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formOrder">
        <Form.Label>Results Order</Form.Label>
        <Row>
          <Col>
            <Form.Select aria-label="Search By Selector">
              <option value="first_name">First Name</option>
              <option value="last_name">Last Name</option>
              <option value="created_at">Created At</option>
              <option value="updated_at">Updated At</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select aria-label="Search By Selector">
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
  );
};

export default SearchFilter;
