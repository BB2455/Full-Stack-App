import PageItem from "./PageItem";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("OK, Rendering PageItem", () => {
  render(
    <BrowserRouter>
      <PageItem num={1} active={false} urlLink={"?page="} special={"First"} />
    </BrowserRouter>
  );
});
