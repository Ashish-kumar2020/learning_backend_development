#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

const program = new Command();
const todoFile = path.join(__dirname, "todos.json");

// Function to load tasks from the JSON file
function loadTasks() {
  if (!fs.existsSync(todoFile)) {
    return [];
  }
  const data = fs.readFileSync(todoFile, "utf8");
  if (data.trim() === "") {
    return [];
  }
  return JSON.parse(data);
}

// Function to save tasks to the JSON file
function saveTasks(tasks) {
  fs.writeFileSync(todoFile, JSON.stringify(tasks, null, 2));
}

// Command to add a new task
program
  .command("add <task>")
  .description("Add a new task")
  .action((task) => {
    const tasks = loadTasks();
    tasks.push({ task, done: false });
    saveTasks(tasks);
    console.log(`Added task: "${task}"`);
  });

// Command to list all tasks
program
  .command("list")
  .description("List all tasks")
  .action(() => {
    const tasks = loadTasks();
    if (tasks.length === 0) {
      console.log("No tasks found.");
    } else {
      tasks.forEach((task, index) => {
        console.log(
          `${index + 1}. ${task.task} [${task.done ? "Done" : "Pending"}]`
        );
      });
    }
  });

// Command to mark a task as done
program
  .command("done <taskNumber>")
  .description("Mark a task as done")
  .action((taskNumber) => {
    const tasks = loadTasks();
    const index = parseInt(taskNumber) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks[index].done = true;
      saveTasks(tasks);
      console.log(`Task "${tasks[index].task}" marked as done.`);
    } else {
      console.log("Invalid task number.");
    }
  });

// Command to remove a task
program
  .command("remove <taskNumber>")
  .description("Remove a task")
  .action((taskNumber) => {
    const tasks = loadTasks();
    const index = parseInt(taskNumber) - 1;
    if (index >= 0 && index < tasks.length) {
      const removedTask = tasks.splice(index, 1);
      saveTasks(tasks);
      console.log(`Removed task: "${removedTask[0].task}"`);
    } else {
      console.log("Invalid task number.");
    }
  });

// Command to clear all tasks
program
  .command("clear")
  .description("Clear all tasks")
  .action(() => {
    saveTasks([]);
    console.log("All tasks cleared.");
  });

program.parse(process.argv);
