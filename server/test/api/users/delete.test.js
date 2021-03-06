/* eslint-disable no-shadow */
import { expect } from 'chai'
import dotenv from 'dotenv'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../../app.js'
import User from '../../../models/user.js'
import { populateDataBase } from '../../mockData.js'

dotenv.config()
process.env.NODE_ENV = 'TEST'

let mongoServer

describe('DELETE /users/id/:id', () => {
  before(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri)
  })

  beforeEach(async () => {
    await User.deleteMany({})
  })

  after(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  // Populate with two users, get users, choose first to be deleted, delete user, get users again, check if user was deleted.
  it('OK, deleting one user', (done) => {
    populateDataBase(2, done)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            expect(res.body.data).to.have.lengthOf(2)
            const idToDelete = res.body.data[0]._id
            expect(res.body.data[0]._id).to.equal(idToDelete)
            request(app)
              .delete(`/users/id/${idToDelete}`)
              .then(() => {
                request(app)
                  .get('/users/1')
                  .then((res) => {
                    expect(res.body.data).to.have.lengthOf(1)
                    expect(res.body.data[0]._id).to.not.equal(idToDelete)
                    done()
                  })
                  .catch((error) => done(error))
              })
              .catch((error) => done(error))
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })
})
