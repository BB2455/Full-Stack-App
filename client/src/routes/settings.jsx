import React, { useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'
import SessionLogoutModal from '../components/Settings/SessionLogoutModal'
import DeleteAccountModal from '../components/Settings/DeleteAccountModal'
import ChangePasswordModal from '../components/Settings/ChangePasswordModal'
import VerifyEmail from '../components/Settings/VerifyEmail'
import ChangeEmailModal from '../components/Settings/ChangeEmailModal'
import { getActiveProfile } from '../utils/getActiveProfile'
import { getDecodedToken } from '../utils/getDecodedToken'

const Settings = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!getActiveProfile()) navigate('/login', { replace: true })
  }, [navigate])
  const user = getDecodedToken(getActiveProfile()?.accessToken)
  return (
    <div>
      <Row className="justify-content-center">
        <Col lg={4} md={6} sm={7}>
          <h1 className="mb-5">Settings</h1>
          {user?.verified_email ? (
            <>
              <h4>Change Email</h4>
              <h6>Change your current email.</h6>
              <ChangeEmailModal />
            </>
          ) : (
            <VerifyEmail />
          )}
          <h4>Change Password</h4>
          <h6>Change your current password.</h6>
          <ChangePasswordModal />
          <h4>Logout All Sessions</h4>
          <h6>Logout all sessions. Will logout current session.</h6>
          <SessionLogoutModal />
          <h4>Delete Account</h4>
          <h6>Delete account. Cannot be undone.</h6>
          <DeleteAccountModal />
        </Col>
      </Row>
    </div>
  )
}

export default Settings
