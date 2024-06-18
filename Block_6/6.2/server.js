const express = require("express");
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
app.use(express.json());
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let books = [
  {
    isbn: "1",
    title: "Der Prozess",
    year: 1925,
    author: "Franz Kafka",
  },
  {
    isbn: "2",
    title: "Die Odyssee",
    year: -800,
    author: "Homer",
  },
  {
    isbn: "3",
    title: "Der große Gatsby",
    year: 1925,
    author: "F. Scott Fitzgerald",
  },
];

let lends = [
  {
    id: 1,
    customer_id: "1234567890",
    isbn: "1",
    borrowed_at: "2024-05-14T09:06:05.439Z",
  },
  {
    id: 2,
    customer_id: "1234567890",
    isbn: "2",
    borrowed_at: "2024-05-14T09:06:32.555Z",
    returned_at: "2024-05-14T09:21:08.873Z",
  },
  {
    id: 3,
    customer_id: "1234567890",
    isbn: "3",
    borrowed_at: "2024-05-14T09:06:35.128Z",
  },
  {
    id: 4,
    customer_id: "1234567890",
    isbn: "4",
    borrowed_at: "2024-05-14T09:26:11.877Z",
  },
];
//---------------------
app.get("/books", (request, response) => {
  response.json(books);
});
//---------------------
app.get("/books/:isbn", (request, response) => {
  const book = books.find((book) => book.isbn === request.params.isbn);
  if (!book) return response.status(404).json({ error: "Not found" });
  response.json(book);
});
//---------------------
app.post("/books", (request, response) => {
  const { isbn, title, year, author } = request.body;
  if (!isbn || !title || !year || !author)
    return response.status(422).json({ error: "Unprocessable" });
  const newBook = { isbn, title, year, author };
  books.push(newBook);
  response.json(newBook);
});
//---------------------
app.put("/books/:isbn", (request, response) => {
  const { isbn, title, year, author } = request.body;
  if (!isbn || !title || !year || !author)
    return response.status(422).json({ error: "Unprocessable" });
  let book = books.find((book) => book.isbn === request.params.isbn);
  if (!book) return response.status(404).json({ error: "Not found" });
  book = { isbn, title, year, author };
  response.json(book);
});
//---------------------
app.delete("/books/:isbn", (request, response) => {
  const bookIndex = books.findIndex(
    (book) => book.isbn === request.params.isbn
  );
  if (bookIndex === -1)
    return response.status(404).json({ error: "Not found" });
  books.splice(bookIndex, 1);
  response.status(204).send();
});
//----
app.patch("/books/:isbn", (request, response) => {
  const book = books.find((book) => book.isbn === request.params.isbn);
  if (!book) return response.status(404).json({ error: "Not found" });
  const { isbn, title, year, author } = request.body;
  if (isbn) book.isbn = isbn;
  if (title) book.title = title;
  if (year) book.year = year;
  if (author) book.author = author;
  response.json(book);
});
//---
app.get("/lends", (request, response) => {
  response.json(lends);
});
//---
app.get("/lends/:id", (request, response) => {
  const lend = lends.find((lends) => lends.id === Number(request.params.id));
  if (!lend) return response.status(404).json({ error: "Not found" });
  response.json(lend);
});
//---
app.post("/lends", (request, response) => {
  const { customer_id, isbn } = request.body;
  if (!customer_id || !isbn)
    return response.status(422).json({ error: "Unprocessable" });

  const openLends = lends.filter(
    (lends) => lends.customer_id === customer_id && !l.returned_at
  );
  if (openLends.length >= 5)
    return response.status(400).json({ error: "Maximum lends reached" });

  const bookAlreadyLent = lends.some(
    (lends) => lends.isbn === isbn && !l.returned_at
  );
  if (bookAlreadyLent)
    return response.status(400).json({ error: "Book already lent" });

  const lend = {
    id: Math.random().toString(36).substr(2, 9),
    id: lends.length + 1,
    customer_id,
    isbn,
    borrowed_at: new Date(),
    returned_at: null,
  };
  lends.push(lend);
  response.json(lend);
});
//---
app.delete("/lends/:id", (request, response) => {
  const id = request.params.id;
  const lendIndex = lends.findIndex((lends) => lends.id == id);

  if (lendIndex === -1) {
    return response.status(404).json({ error: "Not found" });
  }

  lends.splice(lendIndex, 1);
  response.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
