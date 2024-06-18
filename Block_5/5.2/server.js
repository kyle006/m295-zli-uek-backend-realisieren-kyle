const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs');
app.use(express.json());

let books = [];

let lends = [];
//---------------------
fs.readFile('./books.json', 'utf8', (err, data) => {
  if (err) {
      console.error('Error reading file:', err);
      return;
  }
  books = JSON.parse(data);
});
//---------------------
app.get('/books', (req, res) => {
  res.json(books);
});
//---------------------
app.get('/books/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.sendStatus(404);
  res.json(book);
});
//---------------------
app.post('/books', (req, res) => {
  const { isbn, title, year, author } = req.body;
  if (!isbn || !title || !year || !author) return res.sendStatus(422);
  const newBook = { isbn, title, year, author };
  books.push(newBook);
  res.json(newBook);
});
//---------------------
app.put('/books/:isbn', (req, res) => {
  const { isbn, title, year, author } = req.body;
  if (!isbn || !title || !year || !author) return res.sendStatus(422);
  const index = books.findIndex(b => b.isbn === req.params.isbn);
  if (index === -1) return res.sendStatus(404);
  const updatedBook = { isbn, title, year, author };
  books[index] = updatedBook;
  res.json(updatedBook);
});
//---------------------
app.delete('/books/:isbn', (req, res) => {
  const index = books.findIndex(b => b.isbn === req.params.isbn);
  if (index === -1) return res.sendStatus(404);
  books.splice(index, 1);
  res.sendStatus(204);
});
//----
app.patch('/books/:isbn', (req, res) => {
  const index = books.findIndex(b => b.isbn === req.params.isbn);
  if (index === -1) return res.sendStatus(404);
  const book = books[index];
  const { isbn, title, year, author } = req.body;
  if (isbn) book.isbn = isbn;
  if (title) book.title = title;
  if (year) book.year = year;
  if (author) book.author = author;
  res.json(book);
});
//---
app.get('/lends', (req, res) => {
  res.json(books);
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
