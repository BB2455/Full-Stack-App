import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteAccount } from '../../actions/auth'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const DeleteAccountModal = () => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const [formData, setForm] = useState({ password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value })
  }

  const errorHandler = (errorMessage) => {
    const errorCode = errorMessage.match(/\d+/)
    switch (errorCode[0]) {
      case '401':
        setError('Incorrect password, please try again.')
        return
      default:
        setError('Something went wrong, please try again later.')
        return
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(deleteAccount(formData, errorHandler, navigate))
  }

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        className="mt-2 mb-4"
        onClick={handleShow}
      >
        DELETE ACCOUNT
      </Button>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        centered
        aria-labelledby="session-logout-modal"
      >
        <Modal.Header>
          <Modal.Title id="session-logout-modal">DELETE ACCOUNT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are You Sure?</h4>
          <p>
            This will permanently delete all data associated with this account.
            This action cannot be reversed.
          </p>
          <p>Please type in your password to delete your account.</p>
          <Form onSubmit={handleSubmit} id="passwordForm">
            <Form.Group controlId="formPassword">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
              {error && (
                <Form.Text id="loginError" className="text-danger">
                  {error}
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" type="submit" form="passwordForm">
            DELETE ACCOUNT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteAccountModal
