const fs = require("node:fs");

let flag = false;

const filePath = "./file.txt";
fs.openSync(filePath, "w");
fs.writeFileSync(filePath, "Hello World! hello cat , Hello dog, Wow..", { flag: "w" });

let fileContent = fs.readFileSync(filePath).toString();
// fileContent = fileContent.replace("Hello","hi");
// fileContent = fileContent.replace("hello","hi");
fileContent = fileContent.replace(/Hello/g, "hi").replace(/hello/g, "hi");      // regular expression
console.log(fileContent);
fs.appendFileSync(filePath,`\n${fileContent}`);