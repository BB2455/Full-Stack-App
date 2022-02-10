import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'
import { verifyEmail } from '../api'
import { getDecodedToken } from '../utils/getDecodedToken'

const Verify = () => {
  const [message, setMessage] = useState('LOADING')
  const user = localStorage.getItem('profile')
  const { token } = useParams()

  const VerifyEmail = async () => {
    try {
      const { data } = await verifyEmail(token)
      if (
        data.isBoom &&
        data.output.payload.message !== 'Email already verified'
      )
        throw new Error(data.output.payload.message)
      setMessage('SUCCESS')
    } catch (error) {
      setMessage('FAILURE')
      console.error(error.message)
    }
  }

  useEffect(() => {
    const decoded = getDecodedToken(token)
    if (!decoded || !decoded.exp || decoded.exp * 1000 < new Date().getTime())
      return setMessage('INVALID')
    VerifyEmail()
    //eslint-disable-next-line
  }, [])

  return (
    <div>
      <Row className="justify-content-center">
        <Col lg={4} md={6} sm={7}>
          <h1 className="mb-5">Verify Email</h1>
          {message === 'LOADING' && (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {message === 'SUCCESS' && (
            <>
              <h4>Email Has Been Verified.</h4>
              {!user && (
                <h6>
                  <Link to="/login">Login</Link>
                </h6>
              )}
            </>
          )}
          {message === 'INVALID' && (
            <>
              <h4>Invalid Or Expired Token.</h4>
              <h5>
                Please resend email verification through the settings menu.
              </h5>
              {user ? (
                <h6>
                  <Link to="/profile/settings">Settings</Link>
                </h6>
              ) : (
                <h6>
                  <Link to="/login">Login</Link>
                </h6>
              )}
            </>
          )}
          {message === 'FAILURE' && (
            <>
              <h4>Something went wrong.</h4>
              <h5>Please Try Again Later.</h5>
            </>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default Verify
