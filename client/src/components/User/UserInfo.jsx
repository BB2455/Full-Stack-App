import React from 'react'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { getActiveProfile } from '../../utils/getActiveProfile'

const UserInfo = ({ userData, editUser }) => {
  const profile = getActiveProfile()
  return (
    <div>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <div className="fw-bold">First Name</div>
          {userData.first_name}
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="fw-bold">Last Name</div>
          {userData.last_name}
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="fw-bold">Email</div>
          {userData.email}
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="fw-bold">Created On</div>
          {userData.createdAt}
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="fw-bold">User ID</div>
          {userData._id}
        </ListGroup.Item>
      </ListGroup>
      {profile && (
        <Button className="m-3" variant="warning" onClick={editUser}>
          Edit
        </Button>
      )}
    </div>
  )
}

export default UserInfo
