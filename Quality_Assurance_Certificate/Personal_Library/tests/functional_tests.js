import { assert } from 'chai';
import { ObjectId } from 'mongodb';


// Define the base URL of your server
const BASE_URL = 'http://localhost:4000/api/books'; // Adjust the port as needed
let testBookId;

describe("Personal Library API", () => {
  it("should create a new book", async () => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: "Test Book" })
      });
      const data = await response.json();
      assert.equal(response.status, 200);
      assert.isObject(data);
      assert.property(data, "_id");
      assert.propertyVal(data, "title", "Test Book");
      testBookId = data._id;
    } catch (err) {
      assert.fail(err.message);
    }
  });

  it("should return all books", async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      assert.equal(response.status, 200);
      assert.isArray(data);
      assert.isAbove(data.length, 0);
    } catch (err) {
      assert.fail(err.message);
    }
  });

  it("should return a single book by ID", async () => {
    try {
      const response = await fetch(`${BASE_URL}/${testBookId}`);
      const data = await response.json();
      assert.equal(response.status, 200);
      assert.isObject(data);
      assert.propertyVal(data, "_id", testBookId);
      assert.propertyVal(data, "title", "Test Book");
      assert.isArray(data.comments);
    } catch (err) {
      assert.fail(err.message);
    }
  });

  it("should add a comment to a book", async () => {
    try {
      const response = await fetch(`${BASE_URL}/${testBookId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: "Great book!" })
      });
      const data = await response.json();
      assert.equal(response.status, 200);
      assert.isObject(data);
      assert.propertyVal(data, "_id", testBookId);
      assert.include(data.comments, "Great book!");
    } catch (err) {
      assert.fail(err.message);
    }
  });

  it("should return an error when adding a comment without comment field", async () => {
    try {
      const response = await fetch(`${BASE_URL}/${testBookId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const data = await response.text();
      assert.equal(response.status, 200);
      assert.equal(data, "missing required field comment");
    } catch (err) {
      assert.fail(err.message);
    }
  });

  it("should return an error when requesting a non-existing book", async () => {
    try {
      const response = await fetch(`${BASE_URL}/${new ObjectId()}`);
      const data = await response.text();
      assert.equal(response.status, 200);
      assert.equal(data, "no book exists");
    } catch (err) {
      assert.fail(err.message);
    }
  });

  it("should delete a book by ID", async () => {
    try {
      const response = await fetch(`${BASE_URL}/${testBookId}`, { method: 'DELETE' });
      const data = await response.text();
      assert.equal(response.status, 200);
      assert.equal(data, "delete successful");
    } catch (err) {
      assert.fail(err.message);
    }
  });

  it("should return an error when deleting a non-existing book", async () => {
    try {
      const response = await fetch(`${BASE_URL}/${testBookId}`, { method: 'DELETE' });
      const data = await response.text();
      assert.equal(response.status, 200);
      assert.equal(data, "no book exists");
    } catch (err) {
      assert.fail(err.message);
    }
  });

  it("should delete all books", async () => {
    try {
      const response = await fetch(BASE_URL, { method: 'DELETE' });
      const data = await response.text();
      assert.equal(response.status, 200);
      assert.equal(data, "complete delete successful");
    } catch (err) {
      assert.fail(err.message);
    }
  });

  it("should return an empty array after all books are deleted", async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      assert.equal(response.status, 200);
      assert.isArray(data);
      assert.isEmpty(data);
    } catch (err) {
      assert.fail(err.message);
    }
  });
});
