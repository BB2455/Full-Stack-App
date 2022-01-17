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

describe('PATCH /users/id/:id', () => {
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

  // Populate 2 users, get users, grab first user, update grabbed user, get users, check first user with updated values.
  it('OK, updating first_name', (done) => {
    populateDataBase(2, done)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            expect(res.body.data).to.have.lengthOf(2)
            const userToUpdate = res.body.data[0]
            expect(res.body.data[0]._id).to.equal(userToUpdate._id)
            request(app)
              .patch(`/users/id/${userToUpdate._id}`)
              .send({ ...userToUpdate, first_name: 'UPDATED NAME' })
              .then((res) => {
                expect(res.status).to.equal(200)
                request(app)
                  .get('/users/1')
                  .then((res) => {
                    const updatedUser = res.body.data[0]
                    expect(updatedUser._id).to.equal(userToUpdate._id)
                    expect(updatedUser.first_name).to.equal('UPDATED NAME')
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

  it('OK, updating last_name', (done) => {
    populateDataBase(2, done)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            expect(res.body.data).to.have.lengthOf(2)
            const userToUpdate = res.body.data[0]
            expect(res.body.data[0]._id).to.equal(userToUpdate._id)
            request(app)
              .patch(`/users/id/${userToUpdate._id}`)
              .send({ ...userToUpdate, last_name: 'UPDATED NAME' })
              .then((res) => {
                expect(res.status).to.equal(200)
                request(app)
                  .get('/users/1')
                  .then((res) => {
                    const updatedUser = res.body.data[0]
                    expect(updatedUser._id).to.equal(userToUpdate._id)
                    expect(updatedUser.last_name).to.equal('UPDATED NAME')
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

  it('OK, updating email', (done) => {
    populateDataBase(2, done)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            expect(res.body.data).to.have.lengthOf(2)
            const userToUpdate = res.body.data[0]
            expect(res.body.data[0]._id).to.equal(userToUpdate._id)
            request(app)
              .patch(`/users/id/${userToUpdate._id}`)
              .send({ ...userToUpdate, email: 'UPDATED@EMAIL.COM' })
              .then((res) => {
                expect(res.status).to.equal(200)
                request(app)
                  .get('/users/1')
                  .then((res) => {
                    const updatedUser = res.body.data[0]
                    expect(updatedUser._id).to.equal(userToUpdate._id)
                    expect(updatedUser.email).to.equal('UPDATED@EMAIL.COM')
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

  it('OK, updating one user', (done) => {
    populateDataBase(2, done)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            expect(res.body.data).to.have.lengthOf(2)
            const userToUpdate = res.body.data[0]
            expect(res.body.data[0]._id).to.equal(userToUpdate._id)
            request(app)
              .patch(`/users/id/${userToUpdate._id}`)
              .send({
                ...userToUpdate,
                email: 'UPDATED@EMAIL.COM',
                first_name: 'UPDATED FIRST',
                last_name: 'UPDATED LAST',
              })
              .then((res) => {
                expect(res.status).to.equal(200)
                request(app)
                  .get('/users/1')
                  .then((res) => {
                    const updatedUser = res.body.data[0]
                    expect(updatedUser._id).to.equal(userToUpdate._id)
                    expect(updatedUser.first_name).to.equal('UPDATED FIRST')
                    expect(updatedUser.last_name).to.equal('UPDATED LAST')
                    expect(updatedUser.email).to.equal('UPDATED@EMAIL.COM')
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
