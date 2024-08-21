const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("POST /api/solve", () => {
    test("Solve a puzzle with valid puzzle string", (done) => {
      const puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "solution");
          done();
        });
    });

    test("Solve a puzzle with missing puzzle string", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Required field missing");
          done();
        });
    });

    test("Solve a puzzle with invalid characters", (done) => {
      const puzzle = "AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });

    test("Solve a puzzle with incorrect length", (done) => {
      const puzzle = "9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
          done();
        });
    });

    test("Solve a puzzle that cannot be solved", (done) => {
      const puzzle = "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Puzzle cannot be solved");
          done();
        });
    });
  });

  suite("POST /api/check", () => {
    test("Check a puzzle placement with all fields", (done) => {
      const puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const coordinate = "A2";
      const value = "3";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "valid");
          assert.isNotTrue(res.body.valid);
          done();
        });
    });

    test("Check a puzzle placement with single placement conflict", (done) => {
      const puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const coordinate = "A1";
      const value = "1";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "valid");
          assert.isFalse(res.body.valid);
          assert.property(res.body, "conflict");
          assert.isArray(res.body.conflict);
          assert.include(res.body.conflict, "row");
          done();
        });
    });

    test("Check a puzzle placement with multiple placement conflicts", (done) => {
      const puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const coordinate = "A1";
      const value = "9";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "valid");
          assert.isFalse(res.body.valid);
          assert.property(res.body, "conflict");
          assert.isArray(res.body.conflict);
          assert.include(res.body.conflict, "row");
          assert.include(res.body.conflict, "region");
          done();
        });
    });

    test("Check a puzzle placement with all placement conflicts", (done) => {
      const puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const coordinate = "A1";
      const value = "5";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "valid");
          assert.isFalse(res.body.valid);
          assert.property(res.body, "conflict");
          assert.isArray(res.body.conflict);
          assert.include(res.body.conflict, "row");
          assert.include(res.body.conflict, "column");
          assert.include(res.body.conflict, "region");
          done();
        });
    });

    test("Check a puzzle placement with missing required fields", (done) => {
      const puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });

    test("Check a puzzle placement with invalid characters", (done) => {
      const puzzle = "AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const coordinate = "A2";
      const value = "3";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });

    test("Check a puzzle placement with incorrect length", (done) => {
      const puzzle = "9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const coordinate = "A2";
      const value = "3";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
          done();
        });
    });

    test("Check a puzzle placement with invalid placement coordinate", (done) => {
      const puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const coordinate = "Z2";
      const value = "3";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Invalid coordinate");
          done();
        });
    });

    test("Check a puzzle placement with invalid placement value", (done) => {
      const puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const coordinate = "A2";
      const value = "0";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Invalid value");
          done();
        });
    });
  });
});
