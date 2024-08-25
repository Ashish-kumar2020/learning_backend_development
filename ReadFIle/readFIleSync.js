// Reading file synchronously
// Note : readFileSync is a Synchronous method and it does not have callback method

/*
  Output of below code snippet will be
  start
  file content
  end
*/
const fs = require("fs");
console.log("Start");
try {
  const data = fs.readFileSync("./a.txt", "utf-8");
  console.log(data);
} catch (err) {
  console.log(err);
}
console.log("End");
