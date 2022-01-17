import { expect } from 'chai'
import dotenv from 'dotenv'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../../app.js'
import User from '../../../models/user.js'

dotenv.config()
process.env.NODE_ENV = 'TEST'

let mongoServer

describe('POST /users', () => {
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
    request(app)
      .post('/users')
      .send({
        email: 'AAA@AAA.com',
        first_name: 'AAA',
        last_name: 'BBB',
      })
      .then((res) => {
        expect(res.type).to.equal('application/json')
        expect(res.status).to.equal(201)
        done()
      })
      .catch((error) => done(error))
  })

  it('OK, creating new user', (done) => {
    request(app)
      .post('/users')
      .send({
        email: 'AAA@AAA.com',
        first_name: 'AAA',
        last_name: 'BBB',
      })
      .then((res) => {
        const body = res.body
        expect(body).to.haveOwnProperty('_id')
        expect(body).to.haveOwnProperty('first_name')
        expect(body.first_name).to.equal('AAA')
        expect(body).to.haveOwnProperty('last_name')
        expect(body.last_name).to.equal('BBB')
        expect(body).to.haveOwnProperty('email')
        expect(body.email).to.equal('AAA@AAA.com')
        expect(body).to.haveOwnProperty('createdAt')
        expect(body).to.haveOwnProperty('updatedAt')
        done()
      })
      .catch((error) => done(error))
  })
})
