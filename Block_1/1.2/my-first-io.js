//Write a program that uses a single synchronous filesystem operation to read a file and print the number of newlines (\n) it contains to the console (stdout), similar to running cat file | wc -l.
var fs = require('fs');

var content = fs.readFileSync(process.argv[2]);
var line = content.toString().split('\n').length -1;

console.log(line); 