import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { changePassword } from '../../api'
import ChangePasswordForm from './ChangePasswordForm'

const ChangePasswordModal = () => {
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const defaultForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
  const [formData, setForm] = useState(defaultForm)
  const [error, setError] = useState('')

  const errorHandler = (errorMessage) => {
    const errorCode = errorMessage.match(/\d+/)
    switch (errorCode[0]) {
      case '400':
        setError('Incorrect password, please try again.')
        return
      case '409':
        setError('You cannot use your old password, please try again.')
        return
      default:
        setError('Something went wrong, please try again later.')
        return
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      formData.currentPassword === formData.newPassword ||
      formData.currentPassword === formData.confirmPassword
    ) {
      return setError('New Password Cannot Be Current Password')
    }
    if (formData.newPassword !== formData.confirmPassword) {
      return setError('Passwords Must Match')
    }
    try {
      const { data } = await changePassword(formData)
      if (data.isBoom) {
        throw new Error(data.output.statusCode)
      }
      setSuccess(true)
    } catch (error) {
      errorHandler(error.message)
    }
  }

  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Button
        variant="warning"
        size="sm"
        className="mt-2 mb-4"
        onClick={handleShow}
      >
        Change Password
      </Button>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        centered
        aria-labelledby="session-logout-modal"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="session-logout-modal">Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success ? (
            <h5>Successfully Changed Password</h5>
          ) : (
            <ChangePasswordForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              error={error}
              formData={formData}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {success ? 'Close' : 'Cancel'}
          </Button>
          {!success && (
            <Button variant="warning" type="submit" form="changePasswordForm">
              Change Password
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ChangePasswordModal
