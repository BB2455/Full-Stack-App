import Pagination from "../Pagination";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("OK, Rendering Pagination", () => {
  render(
    <BrowserRouter>
      <Pagination currentPage={1} numberOfPages={2} urlLink={"?page="} />
    </BrowserRouter>
  );
});
