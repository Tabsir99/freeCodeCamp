import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "../config/database.js";
import { ObjectId } from "mongodb";

const app = express();
const { db } = await connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const collection = db.collection("Excercise_Tracker");

app.post("/api/users", async (req, res) => {
  const { username } = req.body;

  const userExists = await collection.findOne(
    { username },
    { projection: { _id: 1, username: 1 } }
  );
  if (userExists) {
    res.json(userExists);

    return;
  } else {
    const createUserID = (
      await collection.insertOne({ username, count: 0, log: [] })
    ).insertedId;

    res.json({
      _id: createUserID,
      username: username,
    });
  }
});

app.get("/api/users", async (req, res) => {
  const users = await collection
    .find({}, { projection: { _id: 1, username: 1 } })
    .toArray();

  res.send(users);
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  const { userId, description, date, duration } = req.body;

  const _id = req.params._id;
  if (!(userId || description || duration)) {
    res.json({
      error: "error",
      message:
        "Please provide all of the required info. These are userId, description and duration",
    });
    return;
  }
  let dateToObject;
  if (date) {
    dateToObject = new Date(date);
  } else {
    dateToObject = new Date();
  }

  const addExcercise = await collection.findOneAndUpdate(
    { _id: new ObjectId(_id) },
    {
      $set: {
        description: description,
        date: dateToObject,
        duration: duration,
      },
      $inc: { count: 1 },
      $push: {
        log: {
          description: description,
          date: dateToObject,
          duration: duration,
        },
      },
    },
    {
      returnDocument: "after",
    }
  );

  res.json({
    _id: _id,
    username: addExcercise.username,
    description: addExcercise.description,
    duration: Number(addExcercise.duration),
    date: addExcercise.date.toDateString(),
  });
});

app.get("/api/users/:_id/logs", async (req, res) => {
  const id = req.params._id;
  let { limit, fromDate, toDate } = req.query;

  limit = limit ? parseInt(limit, 10) : 10;
  fromDate = fromDate ? new Date(fromDate) : new Date(0);
  toDate = toDate ? new Date(toDate) : new Date();


  const logs = await collection.findOne(
    {
      _id: new ObjectId(id),
    },
    {
      projection: {
        username: 1,
        count: 1,
        log: {
          $slice: [
            {
              $filter: {
                input: "$log",
                as: "item",
                cond: {
                  $and: [
                    { $gte: ["$$item.date", fromDate] },
                    { $lte: ["$$item.date", toDate] },
                  ],
                },
              },
            },
            limit
          ],
        },
      },
    }
  );

  // Assuming 'logs' contains the fetched document
  const transformedLogs = logs.log.map(entry => ({
    ...entry,
    date: entry.date.toDateString(), // Convert date to ISO string
    duration: Number(entry.duration) // Convert duration to number
  }));

  const updateLogs = {
    ...logs,
    log: transformedLogs
  }

  res.json(updateLogs)
});


export default app;
