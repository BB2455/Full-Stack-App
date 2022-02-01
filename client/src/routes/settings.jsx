import React, { useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Settings = () => {
  const navigate = useNavigate()
  const profile = localStorage.getItem('profile')
  useEffect(() => {
    if (!profile) navigate('/', { replace: true })
  }, [navigate, profile])
  return (
    <div>
      <Row className="justify-content-center">
        <Col lg={4} md={6} sm={7}>
          <h1 className="mb-5">Settings</h1>
          <h4>Change Password</h4>
          <h6>
            Change your current password.
          </h6>
          {/* Change Password Form */}
          <Button variant="warning" size="sm" className="mt-2 mb-4">Change Password</Button>
          <h4>Logout All Sessions</h4>
          <h6>
            Logout all sessions. Will logout current session.
          </h6>
          <Button variant="warning" size="sm" className="mt-2 mb-4">Logout Sessions</Button>
          <h4>Delete Account</h4>
          <h6>
            Delete account. Cannot be undone.
          </h6>
          <Button variant="danger" size="sm" className="mt-2 mb-4">DELETE ACCOUNT</Button>
        </Col>
      </Row>
    </div>
  )
}

export default Settings
