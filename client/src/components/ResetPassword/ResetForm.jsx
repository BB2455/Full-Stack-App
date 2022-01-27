import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { resetPassword } from '../../api'

const ResetForm = ({ token, uid, setSuccess }) => {
  const defaultForm = { password: '', confirmPassword: '' }
  const [formData, setForm] = useState(defaultForm)
  const [error, setError] = useState('')

  const errorHandler = (errorMessage) => {
    const errorCode = errorMessage.match(/\d+/)
    switch (errorCode[0]) {
      case '409':
        setError(
          'You cannot use your old password, please try again. (Congrats you remembered your password!)'
        )
        return
      default:
        setError('Something went wrong, please try again later.')
        return
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords Must Match')
    }
    try {
      const { data } = await resetPassword(formData, token, uid)
      if (data.isBoom) {
        throw new Error(data.output.statusCode)
      }
      setSuccess(true)
    } catch (error) {
      console.error(error.message)
      errorHandler(error.message)
    }
  }

  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formPassword">
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formConfirmPassword">
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
      <div className="d-grid">
        <Button variant="outline-primary" type="submit">
          Reset Password
        </Button>
      </div>
    </Form>
  )
}

export default ResetForm
