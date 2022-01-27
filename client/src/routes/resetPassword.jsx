import React, { useEffect, useState } from 'react'
import ResetForm from '../components/ResetPassword/ResetForm'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { getUsersByToken } from '../api'

const ResetPassword = () => {
  const navigate = useNavigate()
  const profile = localStorage.getItem('profile')
  const [selectedUser, setSelectedUser] = useState('')
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const location = useLocation()

  const getErrorMessage = () => {
    switch (error) {
      case '401':
        return 'Invalid or Expired Token. Please Try Again.'
      case '404':
        return 'No Admins Linked To Email.'
      default:
        return 'Something went wrong. Please try again later.'
    }
  }

  const selectUser = (user) => {
    setSelectedUser(user)
  }

  useEffect(() => {
    if (profile) {
      navigate('/', { replace: true })
      return
    }
    if (users.length > 0) setIsLoading(false)
  }, [navigate, profile, users])

  const fetchUsers = async (token) => {
    try {
      const { data } = await getUsersByToken(token)
      if (data.isBoom) {
        throw new Error(data.output.statusCode)
      }
      if (data.length > 1) {
        setUsers(data)
      } else {
        setSelectedUser(data[0])
      }
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  const token = new URLSearchParams(location.search).get('token')
  useEffect(() => {
    if (token) {
      fetchUsers(token)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Row className="justify-content-center">
        <Col lg={4} md={6} sm={7}>
          {selectedUser ? (
            <>
              <h1 className="mb-5">Reset Password</h1>
              <h5 className="mb-4">Account: {selectedUser.username}</h5>
              {success ? (
                <>
                  <h4>Password Reset.</h4>
                  <h6>Please login with your new password.</h6>
                  <h6>
                    <Link to="/login">Login</Link>
                  </h6>
                </>
              ) : (
                <ResetForm
                  token={token}
                  uid={selectedUser.id}
                  setSuccess={setSuccess}
                />
              )}
            </>
          ) : (
            <>
              <h1 className="mb-5">Select Admin</h1>
              {isLoading && (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              {error && (
                <>
                  <h5>{getErrorMessage()}</h5>
                  <h6 className="mt-5">
                    Would You Like To Resend The Email?{' '}
                    <Link to="/forgot-password">Click Here</Link>
                  </h6>
                </>
              )}
              {users && (
                <>
                  {users.map((user) => (
                    <h2
                      className="mb-4"
                      key={user.id}
                      onClick={() => selectUser(user)}
                    >
                      {user.username}
                    </h2>
                  ))}
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default ResetPassword
