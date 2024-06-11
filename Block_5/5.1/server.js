const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

let books = [
  {
    isbn: "978-3-16-148410-0",
    title: "Der Prozess",
    year: 1925,
    author: "Franz Kafka",
  },
  {
    isbn: "978-0-14-044913-6",
    title: "Die Odyssee",
    year: -800,
    author: "Homer",
  },
  {
    isbn: "978-0-7432-7356-5",
    title: "Der große Gatsby",
    year: 1925,
    author: "F. Scott Fitzgerald",
  },
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:isbn", (req, res) => {
  const book = books.find((b) => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ error: "Not found" });
  res.json(book);
});

app.post("/books", (req, res) => {
  const { isbn, title, year, author } = req.body;
  if (!isbn || !title || !year || !author)
    return res.status(422).json({ error: "Unprocessable entity" });
  const newBook = { isbn, title, year, author };
  books.push(newBook);
  res.json(newBook);
});

app.put("/books/:isbn", (req, res) => {
  const { isbn, title, year, author } = req.body;
  if (!isbn || !title || !year || !author)
    return res.status(422).json({ error: "Unprocessable entity" });
  let book = books.find((b) => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ error: "Not found" });
  book = { isbn, title, year, author };
  res.json(book);
});

app.delete("/books/:isbn", (req, res) => {
  const bookIndex = books.findIndex((b) => b.isbn === req.params.isbn);
  if (bookIndex === -1) return res.status(404).json({ error: "Not found" });
  books.splice(bookIndex, 1);
  res.status(204).send();
});

app.patch("/books/:isbn", (req, res) => {
  const book = books.find((b) => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ error: "Not found" });
  const { isbn, title, year, author } = req.body;
  if (isbn) book.isbn = isbn;
  if (title) book.title = title;
  if (year) book.year = year;
  if (author) book.author = author;
  res.json(book);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
