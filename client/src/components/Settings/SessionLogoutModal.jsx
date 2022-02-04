import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const SessionLogoutModal = () => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <>
      <Button
        variant="warning"
        size="sm"
        className="mt-2 mb-4"
        onClick={handleShow}
      >
        Logout Sessions
      </Button>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        centered
        aria-labelledby="session-logout-modal"
      >
        <Modal.Header>
          <Modal.Title id="session-logout-modal">
            Logout All Sessions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are You Sure?</h4>
          <p>
            This will logout all current sessions associated with this account
            including this current session. You will need to login again.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning">Logout Sessions</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SessionLogoutModal
