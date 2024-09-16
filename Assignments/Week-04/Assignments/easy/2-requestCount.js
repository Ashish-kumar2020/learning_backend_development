const express = require("express");

const app = express();
app.use(express.json());

let requestCounter = 0;

// Middleware to keep track of request count
function requestCounterTracker(req, res, next) {
  requestCounter = requestCounter + 1;
  next();
}

// API TO INCREASE THE COUNT
app.get("/userInfo", requestCounterTracker, (req, res) => {
  const userDetails = {
    firstName: "Ashish Kumar",
    age: 24,
  };

  res.status(200).json({
    message: "User Details",
    userDetails,
  });
});

app.get("/requestCount", requestCounterTracker, (req, res) => {
  res.status(200).json({
    message: "Total Number of Request Hits on the Server",
    requestCounter,
  });
});

const PORT_NUMBER = 4005;
app.listen(PORT_NUMBER, () => {
  console.log(`App is running on PORT_NUMBER ; ${PORT_NUMBER}`);
});
