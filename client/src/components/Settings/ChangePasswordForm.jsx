import React from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const ChangePasswordForm = ({
  handleSubmit,
  formData,
  handleChange,
  error,
}) => {
  return (
    <Form onSubmit={handleSubmit} id="changePasswordForm">
      <Form.Group className="mb-3" controlId="formPassword">
        <FloatingLabel controlId="floatingPassword" label="Current Password">
          <Form.Control
            placeholder="Current Password"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formNewPassword">
        <FloatingLabel controlId="floatingNewPassword" label="New Password">
          <Form.Control
            placeholder="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="formConfirmPassword">
        <FloatingLabel
          controlId="floatingConfirmPassword"
          label="Confirm Password"
        >
          <Form.Control
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
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
  )
}

export default ChangePasswordForm
