const http = require('http');
const URL = process.argv[2];

http.get(URL, function callback(res) {
    res.setEncoding("utf8");

    let completeResponse = "";

    res.on("data", (data) => {
        completeResponse += data;
    });

    res.on("end", () => {
        console.log(completeResponse.split("").length);
        console.log(completeResponse);
    });
});