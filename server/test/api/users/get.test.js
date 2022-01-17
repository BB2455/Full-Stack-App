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

describe('GET /users/:page', () => {
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

  it('OK, body has data property', (done) => {
    request(app)
      .get('/users/1')
      .then((res) => {
        expect(res.body).to.haveOwnProperty('data')
        done()
      })
      .catch((error) => done(error))
  })

  it('OK, body has currentPage property', (done) => {
    request(app)
      .get('/users/1')
      .then((res) => {
        expect(res.body).to.haveOwnProperty('currentPage')
        done()
      })
      .catch((error) => done(error))
  })

  it('OK, body has numberOfPages property', (done) => {
    request(app)
      .get('/users/1')
      .then((res) => {
        expect(res.body).to.haveOwnProperty('numberOfPages')
        done()
      })
      .catch((error) => done(error))
  })

  it('OK, body has results property', (done) => {
    request(app)
      .get('/users/1')
      .then((res) => {
        expect(res.body).to.haveOwnProperty('results')
        done()
      })
      .catch((error) => done(error))
  })

  it('OK, getting users with no page number and empty database', (done) => {
    request(app)
      .get('/users')
      .then((res) => {
        expect(res.body).to.be.empty()
        expect(res.status).to.equal(404)
        done()
      })
      .catch((error) => done(error))
  })

  it('OK, getting users with page 1 and empty database', (done) => {
    request(app)
      .get('/users/1')
      .then((res) => {
        const body = res.body
        expect(body).to.haveOwnProperty('data')
        expect(body.data).to.be.empty()
        expect(body).to.haveOwnProperty('currentPage')
        expect(body.currentPage).to.equal(1)
        expect(body).to.haveOwnProperty('numberOfPages')
        expect(body.numberOfPages).to.equal(0)
        expect(body).to.haveOwnProperty('results')
        expect(body.results).to.equal(0)
        expect(res.status).to.equal(200)
        done()
      })
      .catch((error) => done(error))
  })

  it('OK, getting users with page 1 and 1 user in database', (done) => {
    populateDataBase(1, done)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            const body = res.body
            expect(body).to.haveOwnProperty('data')
            expect(body.data).to.have.lengthOf(1)
            expect(body).to.haveOwnProperty('currentPage')
            expect(body.currentPage).to.equal(1)
            expect(body).to.haveOwnProperty('numberOfPages')
            expect(body.numberOfPages).to.equal(1)
            expect(body).to.haveOwnProperty('results')
            expect(body.results).to.equal(1)
            expect(res.status).to.equal(200)
            done()
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, getting users with page 1 and 2 users in database', (done) => {
    populateDataBase(2, done)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            const body = res.body
            expect(body).to.haveOwnProperty('data')
            expect(body.data).to.have.lengthOf(2)
            expect(body).to.haveOwnProperty('currentPage')
            expect(body.currentPage).to.equal(1)
            expect(body).to.haveOwnProperty('numberOfPages')
            expect(body.numberOfPages).to.equal(1)
            expect(body).to.haveOwnProperty('results')
            expect(body.results).to.equal(2)
            expect(res.status).to.equal(200)
            done()
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, getting users with page 2 and 1 users in database', (done) => {
    populateDataBase(2, done)
      .then(() => {
        request(app)
          .get('/users/2')
          .then((res) => {
            const body = res.body
            expect(body).to.haveOwnProperty('message')
            expect(body.message).to.equal('Not a valid page request')
            expect(res.status).to.equal(400)
            done()
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, getting users with page 2 and 13 users in database', (done) => {
    populateDataBase(13, done)
      .then(() => {
        request(app)
          .get('/users/2')
          .then((res) => {
            const body = res.body
            expect(body).to.haveOwnProperty('data')
            expect(body.data).to.have.lengthOf(1)
            expect(body).to.haveOwnProperty('currentPage')
            expect(body.currentPage).to.equal(2)
            expect(body).to.haveOwnProperty('numberOfPages')
            expect(body.numberOfPages).to.equal(2)
            expect(body).to.haveOwnProperty('results')
            expect(body.results).to.equal(13)
            expect(res.status).to.equal(200)
            done()
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })
})

describe('GET /users/id/:id', () => {
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

  it('OK, body has _id property', (done) => {
    populateDataBase(5)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            const user = res.body.data[0]
            request(app)
              .get(`/users/id/${user._id}`)
              .then((res) => {
                const requestedUser = res.body
                expect(requestedUser).to.haveOwnProperty('_id')
                done()
              })
              .catch((error) => done(error))
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, body has first_name property', (done) => {
    populateDataBase(5)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            const user = res.body.data[0]
            request(app)
              .get(`/users/id/${user._id}`)
              .then((res) => {
                const requestedUser = res.body
                expect(requestedUser).to.haveOwnProperty('first_name')
                done()
              })
              .catch((error) => done(error))
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, body has last_name property', (done) => {
    populateDataBase(5)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            const user = res.body.data[0]
            request(app)
              .get(`/users/id/${user._id}`)
              .then((res) => {
                const requestedUser = res.body
                expect(requestedUser).to.haveOwnProperty('last_name')
                done()
              })
              .catch((error) => done(error))
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, body has email property', (done) => {
    populateDataBase(5)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            const user = res.body.data[0]
            request(app)
              .get(`/users/id/${user._id}`)
              .then((res) => {
                const requestedUser = res.body
                expect(requestedUser).to.haveOwnProperty('email')
                done()
              })
              .catch((error) => done(error))
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, body has createdAt property', (done) => {
    populateDataBase(5)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            const user = res.body.data[0]
            request(app)
              .get(`/users/id/${user._id}`)
              .then((res) => {
                const requestedUser = res.body
                expect(requestedUser).to.haveOwnProperty('createdAt')
                done()
              })
              .catch((error) => done(error))
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, body has updatedAt property', (done) => {
    populateDataBase(5)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            const user = res.body.data[0]
            request(app)
              .get(`/users/id/${user._id}`)
              .then((res) => {
                const requestedUser = res.body
                expect(requestedUser).to.haveOwnProperty('updatedAt')
                done()
              })
              .catch((error) => done(error))
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, getting user by id', (done) => {
    populateDataBase(5)
      .then(() => {
        request(app)
          .get('/users/1')
          .then((res) => {
            const user = res.body.data[0]
            request(app)
              .get(`/users/id/${user._id}`)
              .then((res) => {
                const requestedUser = res.body
                expect(requestedUser).to.eql(user)
                done()
              })
              .catch((error) => done(error))
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })
})

describe('GET /users/search', () => {
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

  it('OK, body has data property', (done) => {
    populateDataBase(12, done)
      .then(() => {
        request(app)
          .get('/users/search')
          .then((res) => {
            expect(res.body).to.haveOwnProperty('data')
            done()
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, body has currentPage property', (done) => {
    populateDataBase(12, done)
      .then(() => {
        request(app)
          .get('/users/search')
          .then((res) => {
            expect(res.body).to.haveOwnProperty('currentPage')
            done()
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, body has numberOfPages property', (done) => {
    populateDataBase(12, done)
      .then(() => {
        request(app)
          .get('/users/search')
          .then((res) => {
            expect(res.body).to.haveOwnProperty('numberOfPages')
            done()
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, body has results property', (done) => {
    populateDataBase(12, done)
      .then(() => {
        request(app)
          .get('/users/search')
          .then((res) => {
            expect(res.body).to.haveOwnProperty('results')
            done()
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, getting users with no search query', (done) => {
    populateDataBase(12, done)
      .then(() => {
        request(app)
          .get('/users/search')
          .then((res) => {
            expect(res.body.data).to.have.lengthOf(12)
            expect(res.body.currentPage).to.equal(1)
            expect(res.body.numberOfPages).to.equal(1)
            expect(res.body.results).to.equal(12)
            done()
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })

  it('OK, getting users with search query', (done) => {
    populateDataBase(12, done)
      .then(() => {
        request(app)
          .get(
            '/users/search?filterBy=firstAndLast&orderType=relevancy&order=ascending&page=1'
          )
          .then((res) => {
            expect(res.body.data).to.have.lengthOf(12)
            expect(res.body.currentPage).to.equal(1)
            expect(res.body.numberOfPages).to.equal(1)
            expect(res.body.results).to.equal(12)
            done()
          })
          .catch((error) => done(error))
      })
      .catch((error) => done(error))
  })
})
