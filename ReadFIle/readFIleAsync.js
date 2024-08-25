// reading file asynchronously
// Output of below code snippet
/*
    Start
    End
    File Content

    Note: This will be the flow how each console statement will be printed
*/
const fs = require("fs");
console.log("Start");
fs.readFile("./a.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("File Not Read Properly : ", err);
  } else {
    console.log(data);
  }
});
console.log("End");
