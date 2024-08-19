import express from "express";
import cors from 'cors'



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'https://www.freecodecamp.org'
}))

app.get("/", async (req, res) => {
  res.json({ message: "yep its doing it" });
});


app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let unix;
  let utc;

  if (!date) {
      const now = new Date();
      unix = now.getTime();
      utc = now.toUTCString();
  } else {
      const parsedDate = isNaN(date) ? new Date(date) : new Date(parseInt(date, 10));
      
      if (parsedDate.toString() === 'Invalid Date') {
          return res.json({ error: 'Invalid Date' });
      }

      unix = parsedDate.getTime();
      utc = parsedDate.toUTCString();
  }

  res.json({ unix, utc });
});




app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "No such route handlers found",
  });
});

export default app;
