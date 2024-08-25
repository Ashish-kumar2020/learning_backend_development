// Writing in file synchronously
// we need to provide absoute path of the file, direct it won't support

const fs = require("fs");
const path = require("path");
const content = "Hi, I have written the file using writefile";
const filePath = path.resolve(__dirname, "./write.txt");
fs.writeFile(filePath, content, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File Update Successfully : ", content);
  }
});
