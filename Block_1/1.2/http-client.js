const http = require('http');
const url = process.argv[2];

http.get(url, function callback(res) {
    res.setEncoding("utf8");
    res.on("data", (data) => {
        console.log(data);
    });
});
