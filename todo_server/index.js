const express = require("express");
const app = express();

app.use(express.json());
const todos = [
  {
    task: "Learning nodejs",
    id: 234,
  },
];

app.get("/fetchtodos", (req, res) => {
  if (todos.length > 0) {
    res
      .status(200)
      .json({ message: "All Todos Fetched Successfully", todo: todos });
  } else {
    res
      .status(400)
      .json({ message: "There is a problem in fetching the todos" });
  }
});

app.post("/addtodo", (req, res) => {
  console.log(req.body);
  const receivedTodo = req.body;
  const randomId = Math.floor(Math.random() * 1000) + 1;
  receivedTodo.id = randomId;
  todos.push(receivedTodo);

  res.status(201).json({
    message: "Todo added successfully.",
    todo: receivedTodo,
  });
});

app.delete("/deletetodo", (req, res) => {
  const result = req.body;
  let idToBeRemoved = Number(result.id);
  console.log(idToBeRemoved);
  const index = todos.findIndex((todo) => todo.id === idToBeRemoved);
  if (index !== -1) {
    // Remove the item from the array
    todos.splice(index, 1);
    res.status(200).json({
      message: `Todo with ID ${idToBeRemoved} removed successfully.`,
    });
  } else {
    res.status(404).json({
      message: `Todo with ID ${idToBeRemoved} not found in the database.`,
    });
  }
});

app.listen(4001, () => {
  console.log("Server is Up and running on port 4001");
});
