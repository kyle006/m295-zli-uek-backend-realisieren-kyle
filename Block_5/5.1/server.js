const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

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

app.get("/books", (request, response) => {
  response.json(books);
});

app.get("/books/:isbn", (request, response) => {
  const book = books.find((b) => b.isbn === request.params.isbn);
  if (!book) return response.status(404).json({ error: "Not found" });
  response.json(book);
});

app.post("/books", (request, response) => {
  const { isbn, title, year, author } = request.body;
  if (!isbn || !title || !year || !author)
    return response.status(422).json({ error: "Unprocessable" });
  const newBook = { isbn, title, year, author };
  books.push(newBook);
  response.json(newBook);
});

app.put("/books/:isbn", (request, response) => {
  const { isbn, title, year, author } = request.body;
  if (!isbn || !title || !year || !author)
    return response.status(422).json({ error: "Unprocessable" });
  let book = books.find((b) => b.isbn === request.params.isbn);
  if (!book) return response.status(404).json({ error: "Not found" });
  book = { isbn, title, year, author };
  response.json(book);
});

app.delete("/books/:isbn", (request, response) => {
  const bookIndex = books.findIndex((b) => b.isbn === request.params.isbn);
  if (bookIndex === -1) return response.status(404).json({ error: "Not found" });
  books.splice(bookIndex, 1);
  response.status(204).send();
});

app.patch("/books/:isbn", (request, response) => {
  const book = books.find((b) => b.isbn === request.params.isbn);
  if (!book) return response.status(404).json({ error: "Not found" });
  const { isbn, title, year, author } = request.body;
  if (isbn) book.isbn = isbn;
  if (title) book.title = title;
  if (year) book.year = year;
  if (author) book.author = author;
  response.json(book);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
