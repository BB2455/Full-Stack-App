import React, { useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'
import SessionLogoutModal from '../components/Settings/SessionLogoutModal'
import DeleteAccountModal from '../components/Settings/DeleteAccountModal'
import ChangePasswordModal from '../components/Settings/ChangePasswordModal'

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
          <ChangePasswordModal />
          <h4>Logout All Sessions</h4>
          <h6>
            Logout all sessions. Will logout current session.
          </h6>
          <SessionLogoutModal />
          <h4>Delete Account</h4>
          <h6>
            Delete account. Cannot be undone.
          </h6>
            <DeleteAccountModal />
        </Col>
      </Row>
    </div>
  )
}

export default Settings
