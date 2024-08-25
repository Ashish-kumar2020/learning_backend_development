// Reading file Asynchronously : Promise version

const fs = require("fs").promises;

async function readFileUsingPromise() {
  try {
    const data = await fs.readFile("./a.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

console.log("Start");
readFileUsingPromise();
console.log("End");
