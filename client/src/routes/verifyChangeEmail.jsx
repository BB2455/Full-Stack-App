import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'
import { verifyChangeEmail } from '../api'
import { getDecodedToken } from '../utils/getDecodedToken'
import { getActiveProfile } from '../utils/getActiveProfile'

const Verify = () => {
  const [message, setMessage] = useState('LOADING')
  const user = getActiveProfile()
  const location = useLocation()
  const token = new URLSearchParams(location.search).get('token')

  const VerifyChangeEmail = async () => {
    try {
      const { data } = await verifyChangeEmail(token)
      if (
        data.isBoom &&
        data.output.payload.message !== 'Email already verified'
      ) {
        if (data.output.payload.message.includes('Invalid Or Expired Token'))
          return setMessage('INVALID')
        throw new Error(data.output.payload.message)
      }
      setMessage('SUCCESS')
    } catch (error) {
      setMessage('FAILURE')
      console.error(error.message)
    }
  }
  const decoded = getDecodedToken(token)
  useEffect(() => {
    if (!decoded || !decoded.exp || decoded.exp * 1000 < new Date().getTime())
      return setMessage('INVALID')
    console.log(decoded.sub)
    VerifyChangeEmail()
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
              {decoded.sub === 'CANCEL' ? (
                <>
                  <h4>Change Email Request Has Been Canceled.</h4>
                  <p>
                    You should change your password as soon as possible if you
                    didn't make this request.
                  </p>
                  {user && (
                    <h6>
                      <Link to="/profile/settings">Settings</Link>
                    </h6>
                  )}
                </>
              ) : (
                <h4>Email Has Been Verified.</h4>
              )}
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
              <h5>Please create another change email request.</h5>
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
