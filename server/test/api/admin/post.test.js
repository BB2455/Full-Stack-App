import { expect } from 'chai'
import dotenv from 'dotenv'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../../app.js'
import User from '../../../models/user.js'
import { createAdmin } from '../../mockData.js'

dotenv.config()
process.env.NODE_ENV = 'TEST'

let mongoServer

describe('POST /admin/login', () => {
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

  it('OK, creating user, returning json', (done) => {
    createAdmin('admin', 'password', done)
      .then(() => {
        request(app)
          .post('/admin/login')
          .send({
            password: 'password',
            username: 'admin',
          })
          .then((res) => {
            expect(res.type).to.equal('application/json')
            expect(res.status).to.equal(200)
            done()
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, body has token property', (done) => {
    createAdmin('admin', 'password', done)
      .then(() => {
        request(app)
          .post('/admin/login')
          .send({
            password: 'password',
            username: 'admin',
          })
          .then((res) => {
            expect(res.body).to.haveOwnProperty('token')
            done()
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })
})
