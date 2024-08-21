"use strict";

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB);

client.connect().then((res) => console.log("Mongodb connected"));

const collection = client
  .db("freeCodeCamp_Projects")
  .collection("issue-tracker");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(async function (req, res) {
      let project = req.params.project;

      const respones = await collection.find({ project }).toArray()

      respones.forEach(response => {
        delete response.project
      })
      res.json(respones)
    })

    .post(async function (req, res) {
      let project = req.params.project;
      const data = req.body;

      const dates = { created_on: new Date(), updated_on: new Date() };
      const doc = await collection.insertOne({
        ...data,
        ...dates,
        project
      });
      res.json({
        _id: doc.insertedId,
        ...data,
        ...dates,
      });
    })

    .put(async function (req, res) {
      let project = req.params.project;
      const data = req.body;

      const response = await collection.findOneAndUpdate(
        { _id: data._id, project },
        {
          $set: {
            ...data,
            updated_on: new Date(),
          },
        },
        { returnDocument: "after" }
      );

      delete response.project
      res.json({
        result: 'successfully updated',
        _id: data._id
      })
    })

    .delete(async function (req, res) {
      let project = req.params.project;

      const { _id } = req.body

      await collection.findOneAndDelete({ _id })

      res.json({
        result: 'successfully deleted',
        _id: _id
      })
    });
};
