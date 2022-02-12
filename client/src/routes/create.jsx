import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserForm from '../components/User/UserForm'
import { getActiveProfile } from '../utils/getActiveProfile'

const CreateUser = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!getActiveProfile()) navigate('/', { replace: true })
  }, [navigate])
  return (
    <div>
      <h1 className="mb-5">Create User</h1>
      <UserForm />
    </div>
  )
}

export default CreateUser
