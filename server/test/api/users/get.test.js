import dotenv from "dotenv";
dotenv.config();
process.env.NODE_ENV = "TEST";

import mongoose from "mongoose";
import request from "supertest";
import { expect } from "chai";
import { MongoMemoryServer } from "mongodb-memory-server";

import app from "../../../app.js";
import User from "../../../models/user.js";
import { populateDataBase } from "../../mockData.js";

let mongoServer;

describe("GET /users/:id", () => {
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

  it("OK, body has data property", (done) => {
    request(app)
      .get("/users/1")
      .then((res) => {
        expect(res.body).to.haveOwnProperty("data");
        done();
      })
      .catch((error) => done(error));
  });

  it("OK, body has currentPage property", (done) => {
    request(app)
      .get("/users/1")
      .then((res) => {
        expect(res.body).to.haveOwnProperty("currentPage");
        done();
      })
      .catch((error) => done(error));
  });

  it("OK, body has numberOfPages property", (done) => {
    request(app)
      .get("/users/1")
      .then((res) => {
        expect(res.body).to.haveOwnProperty("numberOfPages");
        done();
      })
      .catch((error) => done(error));
  });

  it("OK, body has results property", (done) => {
    request(app)
      .get("/users/1")
      .then((res) => {
        expect(res.body).to.haveOwnProperty("results");
        done();
      })
      .catch((error) => done(error));
  });

  it("OK, getting users with no page number and empty database", (done) => {
    request(app)
      .get("/users")
      .then((res) => {
        expect(res.body).to.be.empty;
        expect(res.status).to.equal(404);
        done();
      })
      .catch((error) => done(error));
  });

  it("OK, getting users with page 1 and empty database", (done) => {
    request(app)
      .get("/users/1")
      .then((res) => {
        const body = res.body;
        expect(body).to.haveOwnProperty("data");
        expect(body.data).to.be.empty;
        expect(body).to.haveOwnProperty("currentPage");
        expect(body.currentPage).to.equal(1);
        expect(body).to.haveOwnProperty("numberOfPages");
        expect(body.numberOfPages).to.equal(0);
        expect(body).to.haveOwnProperty("results");
        expect(body.results).to.equal(0);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((error) => done(error));
  });

  it("OK, getting users with page 1 and 1 user in database", (done) => {
    request(app)
      .post("/users")
      .send({
        first_name: "AAA",
        last_name: "BBB",
        email: "AAA@AAA.com",
      })
      .then((res) => {
        request(app)
          .get("/users/1")
          .then((res) => {
            const body = res.body;
            expect(body).to.haveOwnProperty("data");
            expect(body.data).to.have.lengthOf(1);
            expect(body).to.haveOwnProperty("currentPage");
            expect(body.currentPage).to.equal(1);
            expect(body).to.haveOwnProperty("numberOfPages");
            expect(body.numberOfPages).to.equal(1);
            expect(body).to.haveOwnProperty("results");
            expect(body.results).to.equal(1);
            expect(res.status).to.equal(200);
            done();
          })
          .catch((error) => done(error));
      })
      .catch((error) => done(error));
  });

  it("OK, getting users with page 1 and 2 users in database", (done) => {
    populateDataBase(2, done)
      .then((res) => {
        request(app)
          .get("/users/1")
          .then((res) => {
            const body = res.body;
            expect(body).to.haveOwnProperty("data");
            expect(body.data).to.have.lengthOf(2);
            expect(body).to.haveOwnProperty("currentPage");
            expect(body.currentPage).to.equal(1);
            expect(body).to.haveOwnProperty("numberOfPages");
            expect(body.numberOfPages).to.equal(1);
            expect(body).to.haveOwnProperty("results");
            expect(body.results).to.equal(2);
            expect(res.status).to.equal(200);
            done();
          })
          .catch((error) => done(error));
      })
      .catch((error) => done(error));
  });

  it("OK, getting users with page 2 and 1 users in database", (done) => {
    populateDataBase(2, done)
      .then((res) => {
        request(app)
          .get("/users/2")
          .then((res) => {
            const body = res.body;
            expect(body).to.haveOwnProperty("message");
            expect(body.message).to.equal("Not a valid page request");
            expect(res.status).to.equal(400);
            done();
          })
          .catch((error) => done(error));
      })
      .catch((error) => done(error));
  });

  it("OK, getting users with page 2 and 13 users in database", (done) => {
    populateDataBase(13, done)
      .then((res) => {
        request(app)
          .get("/users/2")
          .then((res) => {
            const body = res.body;
            expect(body).to.haveOwnProperty("data");
            expect(body.data).to.have.lengthOf(1);
            expect(body).to.haveOwnProperty("currentPage");
            expect(body.currentPage).to.equal(2);
            expect(body).to.haveOwnProperty("numberOfPages");
            expect(body.numberOfPages).to.equal(2);
            expect(body).to.haveOwnProperty("results");
            expect(body.results).to.equal(13);
            expect(res.status).to.equal(200);
            done();
          })
          .catch((error) => done(error));
      })
      .catch((error) => done(error));
  });
});
