import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.set("trust proxy", true);

app.use(
  cors({
    origin: "https://www.freecodecamp.org",
  })
);
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Useless Home route... ");
});

app.get("/api/whoami", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.ip;
  const preferedLang = req.acceptsLanguages();
  const browser = req.headers["user-agent"];

  res.json({
    ipaddress: ip,
    language: preferedLang[0],
    software: browser,
  });
});

export default app;
