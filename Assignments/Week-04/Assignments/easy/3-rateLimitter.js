const express = require("express");
const app = express();
app.use(express());
app.use(express.json());

let numberOfRequestsForUser = {};
app.use((req, res, next) => {
  const userId = req.headers["user-id"];
  if (!userId) {
    return res
      .status(400)
      .json({ message: "User ID is required in the headers" });
  }

  if (!numberOfRequestsForUser[userId]) {
    numberOfRequestsForUser[userId] = 0;
  }
  numberOfRequestsForUser[userId]++;
  if (numberOfRequestsForUser[userId] > 5) {
    return res
      .status(404)
      .json({ message: "Too many requests, rate limit exceeded" });
  }
  next();
});
setInterval(() => {
  numberOfRequestsForUser = {};
}, 5000);

app.get("/", (req, res) => {
  res.send("Welcome to the rate-limited API!");
});
const PORT_NUMBER = 4006;
app.listen(PORT_NUMBER, () => {
  console.log(`App is running on PORT_NUMBER : ${PORT_NUMBER}`);
});
