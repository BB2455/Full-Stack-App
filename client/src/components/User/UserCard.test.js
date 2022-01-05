import UserCard from "./UserCard";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("OK, Rendering UserCard", () => {
  render(
    <BrowserRouter>
      <UserCard
        user={{
          _id: "test",
          first_name: "First",
          last_name: "Last",
          email: "Test@Email.com",
        }}
      />
    </BrowserRouter>
  );
});
