import React from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const ChangeEmailForm = ({
  handleSubmit,
  formData,
  handleChange,
  error,
  loading
}) => {
  return (
    <Form onSubmit={handleSubmit} id="changeEmailForm" style={{contentVisibility: `${loading ? 'hidden' : 'visible'}`}}>
      <Form.Group className="mb-3" controlId="formNewEmail">
        <FloatingLabel controlId="floatingNewEmail" label="New Email">
          <Form.Control
            placeholder="New Email"
            type="email"
            name="newEmail"
            value={formData.newEmail}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="formPassword">
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
        >
          <Form.Control
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        {error && (
          <Form.Text id="errorText" className="text-danger">
            {error}
          </Form.Text>
        )}
      </Form.Group>
    </Form>
  )
}

export default ChangeEmailForm
