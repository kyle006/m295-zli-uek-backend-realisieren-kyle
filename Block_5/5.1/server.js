const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const fs = require('fs');

let books;
try {
    books = JSON.parse(fs.readFileSync('books.json', 'utf8'));
} catch (err) {
    console.error(err);
    books = [];
}

app.get('/books', (req, res) => {
    res.json(books);
}); 

app.get('/books/:isbn', (req, res) => {

    const isbn = req.params.isbn;
    const book = books.find(b => b.isbn === isbn);

    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.post('/books', (req, res) => {
    const book = req.body;
    if (book.isbn && book.title && book.year && book.author) {
        books.push(book);
        fs.writeFileSync('books.json', JSON.stringify(books));
        res.json(book);
    } else {
        res.status(422).send('Invalid book');
    }
});

app.put('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = req.body;
    const index = books.findIndex(b => b.isbn === isbn);

    if (index !== -1) {
        books[index] = book;
        fs.writeFileSync('books.json', JSON.stringify(books));
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.delete('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const index = books.findIndex(b => b.isbn === isbn);

    if (index !== -1) {
        books.splice(index, 1);
        fs.writeFileSync('books.json', JSON.stringify(books));
        res.status(200).send('Book deleted');
    } else {
        res.status(404).send('Book not found');
    }
});

app.patch('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;
    const index = books.findIndex(b => b.isbn === isbn);

    if (index !== -1) {
        const book = books[index];
        if (newBook.isbn) book.isbn = newBook.isbn;
        if (newBook.title) book.title = newBook.title;
        if (newBook.year) book.year = newBook.year;
        if (newBook.author) book.author = newBook.author;
        books[index] = book;
        fs.writeFileSync('books.json', JSON.stringify(books));
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });