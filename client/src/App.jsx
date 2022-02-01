import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { NavBar } from './components'

import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Settings,
  Search,
  User,
  NotFoundPage,
  CreateUser,
} from './routes'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Container className="mt-5 mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="search" element={<Search />} />
          <Route path="create" element={<CreateUser />} />
          <Route path="user/:id" element={<User />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
