import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { NavBar } from "./components";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import Login from "./routes/login";
import Search from "./routes/search";
import User from "./routes/user";
import NotFoundPage from "./routes/404";
import CreateUser from "./routes/create";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="search" element={<Search />} />
          <Route path="create" element={<CreateUser />} />
          <Route path="user/:id" element={<User />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
