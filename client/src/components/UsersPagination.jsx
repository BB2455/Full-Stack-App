import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";

const UsersPagination = ({ currentPage, numberOfPages, setSearch }) => {
  if (numberOfPages === 1) return null;
  let items = [];
  for (let i = 1; i <= numberOfPages; i++) {
    items.push(
      <li
        className={i === currentPage ? "page-item active" : "page-item"}
        key={i}
      >
        <Link className="page-link" to={`/?page=${i}`}>
          {i}
        </Link>
      </li>
    );
  }
  return (
    <>
      {numberOfPages < 5 ? (
        <Pagination className="mt-5 justify-content-center">{items}</Pagination>
      ) : (
        <Pagination>{"to many"}</Pagination>
      )}
    </>
  );
};

export default UsersPagination;
