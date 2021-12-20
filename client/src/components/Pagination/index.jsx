import React from "react";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "./PageItem";

const pagination = ({ currentPage, numberOfPages, urlLink }) => {
  if (numberOfPages === 1) return null;

  const createItems = (end, start = 1) => {
    let items = [];
    for (let i = start; i <= end; i++) {
      items.push(
        <PageItem
          key={i}
          num={i}
          active={currentPage === i}
          urlLink={urlLink}
        />
      );
    }
    return items;
  };

  const createPagination = () => {
    let items = [];

    if (currentPage > 3) {
      items.push(
        <PageItem key={"first"} num={1} urlLink={urlLink} special={"First"} />
      );
    }

    if (currentPage > 1) {
      items.push(
        <PageItem
          key={"previous"}
          num={currentPage - 1}
          urlLink={urlLink}
          special={"Previous"}
        />
      );
    }

    // Begining of current position
    if (currentPage > 3) {
      items.push(createItems(currentPage, currentPage - 2));
    } else if (currentPage > 2 || currentPage > 1 || currentPage === 1) {
      items.push(createItems(currentPage));
    }

    // Current Page at the end, return items
    if (currentPage === numberOfPages) return items;

    //Ending of current position
    if (currentPage + 2 <= numberOfPages) {
      items.push(createItems(currentPage + 2, currentPage + 1));
    } else if (currentPage + 1 <= numberOfPages) {
      items.push(createItems(currentPage + 1, currentPage + 1));
    }

    if (currentPage < numberOfPages) {
      items.push(
        <PageItem
          key={"next"}
          num={currentPage + 1}
          urlLink={urlLink}
          special={"Next"}
        />
      );
    }

    if (currentPage + 2 < numberOfPages) {
      items.push(
        <PageItem
          key={"last"}
          num={numberOfPages}
          urlLink={urlLink}
          special={"Last"}
        />
      );
    }

    return items;
  };

  return (
    <>
      <Pagination className="mt-5 justify-content-center">
        {createPagination()}
      </Pagination>
    </>
  );
};

export default pagination;
