import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ChangeEmailForm from './ChangeEmailForm'
import { changeEmailRequest } from '../../api'
import Spinner from 'react-bootstrap/Spinner'

const ChangeEmailModal = () => {
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const defaultForm = {
    newEmail: '',
    password: '',
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
        setError('You cannot use your current email, please try again.')
        return
      default:
        setError('Something went wrong, please try again later.')
        return
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    try {
      setLoading(true)
      const { data } = await changeEmailRequest(formData)
      if (data.isBoom) {
        if (data.output.payload.message.includes('Email')) throw new Error(409)
        throw new Error(data.output.statusCode)
      }
      setLoading(false)
      setSuccess(true)
    } catch (error) {
      setLoading(false)
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
        Change Email
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
          <Modal.Title id="session-logout-modal">Change Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success ? (
            <>
              <h5>Change Email Request Sent</h5>
              <p>Please verify your request within 30 days.</p>
            </>
          ) : (
            <>
              <p>
                You will receive an email on your current email and new
                requested email. You will need to verify the request on both
                emails to change email immediately.
              </p>
              <p>
                If you can't access your current email you will need to verify
                on your new email and wait 30 days to automatically complete the
                request.
              </p>
              <p>
                If you didn't request a change email request you have 30 days to
                cancel the request. You should also change your password as soon
                as possible.
              </p>
              <ChangeEmailForm
                loading={loading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                error={error}
                formData={formData}
              />
              {loading && (
                <div className="d-flex m-4 justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {success ? 'Close' : 'Cancel'}
          </Button>
          {!success && (
            <Button variant="warning" type="submit" form="changeEmailForm">
              Change Email
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ChangeEmailModal
