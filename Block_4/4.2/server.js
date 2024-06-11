const express = require('express');
const fs = require('fs');
const { request } = require('http');
const app = express();
const port = 3000;

let me = {};

app.get("/now", (request, response) => {
    const timezone = request.query.tz;
    response 
        .status(200)
        .send(new Date().toLocaleString("de-Ch", { timeZone: timezone }));
});

app.post("/names", express.json(), (request, response) => {
    const name = request.body.name;
    const names = fs.readFileSync(__dirname + "/names.json", "utf8");
    const parsedNames = JSON.parse(names);
    parsedNames.names.push(name);
    fs.writeFileSync(__dirname + "/names.json", JSON.stringify(parsedNames));
    response.sendStatus(201);
});

app.delete("/names", (request, response) => {
    const name = request.body.name;

    const names = fs.readFileSync(__dirname + "/names.json", "utf8");
    const parsedNames = JSON.parse(names);
    parsedNames.names.splice(parsedNames.names.indexOf(name), 1);

    fs.writeFileSync(__dirname + "/names.json", JSON.stringify(parsedNames));

    response.sendStatus(204);
});

app.get("/secret2", (request, response) => {
    const authHeader = request.headers["authorization"];

    if (authHeader === "Basic aGFja2VyOjEyMzQ=") {
        return response.sendStatus(200);
    } else {
        return response.sendStatus(401);
    }
});

app.get("/chuck", (request, response) => {
    
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});