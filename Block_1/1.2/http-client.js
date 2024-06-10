//Write a program that performs an HTTP Get request to a URL provided to you as the first command-line argument. Write the String contents of each "data" event from the response to a new line on the console (stdout).
const http = require('http');
const url = process.argv[2];

http.get(url, function callback(res) {
    res.setEncoding("utf8");
    res.on("data", (data) => {
        console.log(data);
    });
});
