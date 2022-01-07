import dotenv from 'dotenv';
dotenv.config();
process.env.NODE_ENV = 'TEST';

import mongoose from 'mongoose';
import request from 'supertest';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';

import app from '../../../app.js';
import User from '../../../models/user.js';

import { createAdmin } from '../../mockData.js';

let mongoServer;

describe('POST /admin/login', () => {
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('OK, creating user, returning json', (done) => {
    createAdmin('admin', 'password', done)
      .then(() => {
        request(app)
          .post('/admin/login')
          .send({
            username: 'admin',
            password: 'password',
          })
          .then((res) => {
            expect(res.type).to.equal('application/json');
            expect(res.status).to.equal(200);
            done();
          })
          .catch((error) => done(error));
      })
      .catch((error) => done(error));
  });

  it('OK, body has token property', (done) => {
    createAdmin('admin', 'password', done)
      .then(() => {
        request(app)
          .post('/admin/login')
          .send({
            username: 'admin',
            password: 'password',
          })
          .then((res) => {
            expect(res.body).to.haveOwnProperty('token');
            done();
          })
          .catch((error) => done(error));
      })
      .catch((error) => done(error));
  });
});
