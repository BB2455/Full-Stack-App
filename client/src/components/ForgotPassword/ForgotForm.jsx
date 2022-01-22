import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../../actions/auth'

const ForgotForm = ({setEmailSent}) => {
  const dispatch = useDispatch()
  const defaultForm = { email: '' }
  const [formData, setForm] = useState(defaultForm)
  const [error, setError] = useState('')

  const errorHandler = (errorMessage) => {
    const errorCode = errorMessage.match(/\d+/)
    switch (errorCode[0]) {
      case '404':
        setError('Admin not found, please try again.')
        return
      default:
        setError('Something went wrong, please try again later.')
        return
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(formData, errorHandler, setEmailSent))
  }

  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formEmail">
        <FloatingLabel controlId="floatingEmail" label="Email">
          <Form.Control
            placeholder="Email"
            type="email"
            name="email"
            value={formData.password}
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

export default ForgotForm
