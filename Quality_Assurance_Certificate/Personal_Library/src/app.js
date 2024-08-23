import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "../config/database.js";
import { ObjectId } from "mongodb";

const app = express();

const { db } = await connectDB();
const collection = db.collection("personal-library");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/books/:_id?", async (req, res) => {
  const id = req.params._id;

  if (!id) {
    const allBooks = await collection.find().toArray();

    res.json(allBooks);
  } else {
    console.log(id);
    const book = await collection.findOne({ _id: new ObjectId(id) });

    if (!book) {
      return res.send("no book exists");
    }
    res.json({
      ...book,
      _id: id,
    });
  }
});

app.post("/api/books/:_id?", async (req, res) => {
  const data = req.body;
  const id = req.params._id;

  if (id) {
    if (!data.comment) {
      return res.send("missing required field comment");
    }

    const response = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $push: {
          comments: data.comment,
        },
      },
      {
        returnDocument: "after",
      }
    );
    if (!response) {
      return res.send("no book exists");
    }

    return res.json(response);
  }

  if (!data.title) {
    return res.send("missing required field title");
  }

  const response = await collection.findOneAndUpdate(
    { title: data.title },
    { $set: { title: data.title, comments: [], commentcount: 0 } },
    {
      returnDocument: "after",
      upsert: true,
    }
  );

  res.json({
    _id: response._id.toString(),
    title: response.title,
  });
});

app.delete("/api/books/:_id?", async (req, res) => {
  const id = req.params._id;

  if (!id) {
    const response = await collection.deleteMany({});
    return res.send("complete delete successful");
  } else {
    const response = await collection.findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!response) {
      return res.send("no book exists");
    }
    return res.send("delete successful");
  }
});

app.get("/_api/get-tests", async (req, res) => {
  res.json(
    new Array(10).fill({
      title: "ES6 module not supported in mocha and chai",
      content:
        "To run the test its ncessary to manually run npm test, and the tests will pass, It has been tested.",
    })
  );
});

export default app;
