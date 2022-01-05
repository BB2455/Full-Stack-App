import UserInfo from "./UserInfo";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("OK, Rendering UserInfo", () => {
  render(
    <BrowserRouter>
      <UserInfo
        userData={{
          _id: "test",
          first_name: "First",
          last_name: "Last",
          email: "Test@Email.com",
          createdAt: "Jan 5, 2022, 11:13",
        }}
        editUser={() => {}}
      />
    </BrowserRouter>
  );
});
