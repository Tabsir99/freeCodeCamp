import express from "express";
import cors from "cors";
import dns from "dns";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "../config/database.js";

const app = express();
const { db } = await connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Middleware for URL validation
const validateUrl = (req, res, next) => {
  const { url } = req.body;
  try {
    const urlObject = new URL(url);
    if (!['http:', 'https:'].includes(urlObject.protocol)) {
      return res.json({ error: "Invalid URL protocol" });
    }
    req.urlHostname = urlObject.hostname
    next();
  } catch (error) {
    console.log(error)
    return res.json({ error: "Invalid URL" });
  }
};

app.get("/api/shorturl/:value", async (req, res) => {
  try {
    const { value } = req.params;
    const doc = await db.collection("URL_Shortener_Microservice").findOne(
      { short_url: Number(value) },
      { projection: { originalUrl: 1 } }
    );
    if (!doc) {
      return res.json({ error: "No short URL found" });
    }
    res.redirect(doc.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/shorturl", validateUrl, async (req, res) => {
  try {
    const originalUrl = req.body.url;

    const { urlHostname } = req

    await dns.promises.lookup(urlHostname);

    const urlSaved = await db.collection("URL_Shortener_Microservice").findOne(
      { originalUrl },
      { projection: { originalUrl: 1, short_url: 1 } }
    );

    if (urlSaved) {
      return res.json({ originalUrl: urlSaved.originalUrl, short_url: urlSaved.short_url });
    }

    const counter = await db.collection("URL_Shortener_Microservice").findOneAndUpdate(
      { _id: "urlShortener" },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after" }
    );

    const newShortUrl = counter.seq;
    await db.collection("URL_Shortener_Microservice").insertOne({ originalUrl, short_url: newShortUrl });

    res.json({ originalUrl, short_url: newShortUrl });
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      return res.json({ error: "Invalid Hostname" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;