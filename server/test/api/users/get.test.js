import dotenv from "dotenv";
dotenv.config();
process.env.NODE_ENV = "TEST";

import { expect } from "chai";
import request from "supertest";

import app from "../../../app.js";
import connection from "../../../database/index.js";

describe("GET /users", () => {
  before((done) => {
    connection
      .connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    connection
      .close()
      .then(() => done())
      .catch((err) => done(err));
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
});
