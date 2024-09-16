const express = require("express");

const app = express();
app.use(express.json());

app.post("/add", function (req, res) {
  const { num1, num2 } = req.body;
  console.log(num1, num2);
});

app.get("/multiply", function (req, res) {
  // when values are passed in url
  // note: when we pass value in url we use get request
  const param1 = parseInt(req.query.num1);
  const param2 = parseInt(req.query.num2);
  console.log(param1, param2);

  // when values are passed in body
  // Note: when we pass value in body we use post request
  //   const { num1, num2 } = req.body;
  //   console.log(num1, num2);
});

// How to handle dynamic routes
// ex of dynamic routes - http://localhost:4002/divide/2/4

//For route parameters (which are defined using : in the route path), you should use req.params instead of req.query.
app.get("/divide/:a/:b", function (req, res) {
  const param1 = parseInt(req.params.a);
  const param2 = parseInt(req.params.b);
  console.log(param1, param2);
  const ans = param1 / param2;
  res.send({ ans });
});

app.listen(4002, () => {
  console.log("Server is Up and running on port Number : 4002");
});
