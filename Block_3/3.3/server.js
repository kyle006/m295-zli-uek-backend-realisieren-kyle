const express = require("express");
const fs = require("fs");
const { request } = require("http");
const app = express();
const port = 3000;

const names = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Frank',
  'Grace',
  'Hannah',
  'Ivan',
  'Jack',
  'Karen',
  'Liam',
  'Mia',
  'Noah',
  'Olivia',
  'Paul',
  'Quincy',
  'Rachel',
  'Sophia',
  'Tom',
];

app.get("/now", (request, response) => {
  const now = new Date();
  response.status(200).send(now.toISOString());
});

app.get('/zli', (request, response) => {
    response.redirect('https://www.zli.ch/');
  });

  app.get('/name', (request, response) => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    response.status(200).send(randomName);
  });

app.get('/html', (request, response) => {
    fs.readFile('./index.html', 'utf8', (err, htmlpage) => {
        if (err) {
            response.status(500).send('Internal Server Error');
        } else {
            response.status(200).send(htmlpage);
        }
    });
});

app.get('/image', (request, response) => {
    response.sendFile('C:/Users/kylej/OneDrive - bbw.ch/ÜK/ÜK_295/Block_3/3.3/jump.jpeg');
});

app.get('/teapot', (request, response) => {
    response.status(418).send('I am a teapot');
});

app.get('/user-agent', (request, response) => {
    response.send(request.headers['user-agent']);
});

app.get('/secret', (request, response) => {
    response.status(401).send('Unauthorized');
});

app.get('/xml', (request, response) => {
    response.sendFile('C:/Users/kylej/OneDrive - bbw.ch/ÜK/ÜK_295/Block_3/3.3/file.xml');
});

app.get('/me', (request, response) => {
    fs.readFile('./me.json', 'utf8', (err, data) => {
        if (err) {
            response.status(500).send('Internal Server Error');
        } else {
            const me = JSON.parse(data);
            response.status(200).json(me);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});