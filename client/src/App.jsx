import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { NavBar } from "./components";
import { useDispatch } from "react-redux";
import { getUsers } from "./actions/users";
import { loaded } from "./actions/loaded";

import { Home, Login, Search, User, NotFoundPage, CreateUser } from "./routes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers()).then(dispatch(loaded()));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Container className="mt-5 mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="search" element={<Search />} />
          <Route path="create" element={<CreateUser />} />
          <Route path="user/:id" element={<User />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
