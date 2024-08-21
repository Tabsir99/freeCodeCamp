"use strict";

const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.MONGODB);
client.connect().then(() => console.log("Mongodb connected"));

const collection = client
  .db("freeCodeCamp_Projects")
  .collection("issue-tracker");

module.exports = function (app) {
  app.route("/api/issues/:project")
    .get(async function (req, res) {
      let project = req.params.project;
      let filter = { project };

      // Convert query parameters to correct data types and apply as filters
      if (req.query) {
        for (let key in req.query) {
          let value = req.query[key];
          // Convert boolean strings to actual boolean values
          if (value === 'true') value = true;
          if (value === 'false') value = false;
          if(key === '_id') value = new ObjectId(value)
          filter[key] = value;
        }
      }

      try {
        const responses = await collection.find(filter).toArray();
        responses.forEach(response => {
          delete response.project;
        });
        res.json(responses);
      } catch (err) {
        res.json({ error: 'could not retrieve issues' });
      }
    })

    .post(async function (req, res) {
      let project = req.params.project;
      const data = req.body;
      let { issue_text, issue_title, created_by, assigned_to, status_text } = data;

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: 'required field(s) missing' });
      }

      data.assigned_to = assigned_to || '';
      data.status_text = status_text || '';

      const dates = { created_on: new Date(), updated_on: new Date() };
      try {
        const doc = await collection.insertOne({
          ...data,
          ...dates,
          open: true,
          project
        });
        res.json({
          _id: doc.insertedId,
          open: true,
          ...data,
          ...dates,
        });
      } catch (err) {
        res.json({ error: 'could not create issue' });
      }
    })

    .put(async function (req, res) {
      let project = req.params.project;
      const data = req.body;

      if (!data._id) {
        return res.json({ error: 'missing _id' });
      }

      const updates = { ...data };
      delete updates._id;  // Remove _id from the update fields

      // Check if any update fields are provided
      if (Object.keys(updates).length === 0) {
        return res.json({ error: 'no update field(s) sent', '_id': data._id });
      }

      updates.updated_on = new Date();

      try {
        const response = await collection.findOneAndUpdate(
          { _id: new ObjectId(data._id), project },
          { $set: updates },
          { returnDocument: "after" }
        );
        if (response._id) {
          res.json({ result: 'successfully updated', '_id': data._id });
        } else {
          res.json({ error: 'could not update', '_id': data._id });
        }
      } catch (err) {
        res.json({ error: 'could not update', '_id': data._id });
      }
    })

    .delete(async function (req, res) {
      let project = req.params.project;
      const { _id } = req.body;

      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      try {
        const response = await collection.findOneAndDelete({
          _id: new ObjectId(_id),
          project,
        });
        if (response._id) {
          res.json({ result: 'successfully deleted', '_id': _id });
        } else {
          res.json({ error: 'could not delete', '_id': _id });
        }
      } catch (err) {
        res.json({ error: 'could not delete', '_id': _id });
      }
    });
};
