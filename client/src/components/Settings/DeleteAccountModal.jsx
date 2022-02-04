import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteAccount } from '../../actions/auth'
import decode from 'jwt-decode'

const DeleteAccountModal = () => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const onDeleteAccount = async () => {
    const userId = decode(
      JSON.parse(localStorage.getItem('profile'))?.accessToken
    )?.id
    await dispatch(deleteAccount(userId))
    navigate('/')
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onDeleteAccount}>
            DELETE ACCOUNT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteAccountModal
