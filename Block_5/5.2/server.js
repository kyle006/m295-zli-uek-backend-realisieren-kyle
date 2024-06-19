const express = require("express");
const session = require("express-session");
const port = 3000;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
 
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple Express Library API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./server.js'],
};
 
const swaggerSpec = swaggerJsdoc(options);
 
const app = express();
 
app.use(express.json());
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {},
}));

const password = 'zli';
//---------------------------------------------------------------------
app.post('/login', (request, response) => {
  const logindata = request.body;

  if (password === logindata.password) {
    request.session.email = logindata.email;
    response.cookie('user', logindata.email, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    return response.status(200).json({ email: request.session.email });
  }
  return response.status(403).json({ error: 'Forbidden' });
});

/**
 * @openapi
 * /verify:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Verifies the session
 *     responses:
 *       200:
 *         description: Session is verified
 *       401:
 *         description: Session is expired
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *     required:
 *       - email  
 *       - password
 *       - error
 */
//---------------------------------------------------------------------
app.get('/verify', isAuthenticated,(request, response) => {
  if (request.session.email) {
    return response.status(200).json({ message: 'Session is verified' });
  }
  return response.status(401).json({ error: 'Session is expired' });
});
/**
 * @openapi
 * /logout:
 *   delete:
 *     tags:
 *       - Authentication
 *     summary: Logs out a user
 *     responses:
 *       204:
 *         description: The user is logged out
 *       401:
 *         description: Not logged in
 */
//---------------------------------------------------------------------
app.delete('/logout', isAuthenticated, (request, response) => {
  if (request.session.email) {
    request.session.destroy();
    return response.status(204).send();
  }

  return response.status(401).json({ error: 'Not logged in' });
});


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
    title: "Der grosse Gatsby",
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
function isAuthenticated(request, response, next) {
  if (request.session.email) {
    next();
  } else {
    response.status(401).json({ error: 'Not logged in' });
  }
}

/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *       - books
 *     summary: Returns a list of all books
 *     responses:
 *       200:
 *         description: A JSON array of all books
 *       404:
 *         description: Not found
 */
//---------------------------------------------------------------------
app.get("/books", isAuthenticated, (request, response) => {
  response.json(books);
});

/**
 * @openapi
 * /books/{isbn}:
 *   get:
 *     tags:
 *       - books
 *     summary: Returns a book with a specific ISBN
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A book object
 *       404:
 *         description: Not found
 */
//---------------------------------------------------------------------
app.get("/books/:isbn", isAuthenticated, (request, response) => {
  const book = books.find((book) => book.isbn === request.params.isbn);
  if (!book) return response.status(404).json({ error: "Not found" });
  response.json(book);
});

/**
 * @openapi
 * /books:
 *   post:
 *     tags:
 *       - books
 *     summary: Adds a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isbn:
 *                 type: string
 *               title:
 *                 type: string
 *               year:
 *                 type: integer
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created book object
 *       422:
 *         description: Unprocessable
 */
//---------------------------------------------------------------------
app.post("/books", isAuthenticated, (request, response) => {
  const { isbn, title, year, author } = request.body;
  if (!isbn || !title || !year || !author)
    return response.status(422).json({ error: "Unprocessable" });
  const newBook = { isbn, title, year, author };
  books.push(newBook);
  response.json(newBook);
});

/**
 * @openapi
 * /books/{isbn}:
 *   put:
 *     tags:
 *       - books
 *     summary: Updates a book with a specific ISBN
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isbn:
 *                 type: string
 *               title:
 *                 type: string
 *               year:
 *                 type: integer
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated book object
 *       404:
 *         description: Not found
 *       422:
 *         description: Unprocessable
 */
app.put("/books/:isbn", isAuthenticated, (request, response) => {
  const { isbn, title, year, author } = request.body;
  if (!isbn || !title || !year || !author)
    return response.status(422).json({ error: "Unprocessable" });
  let book = books.find((book) => book.isbn === request.params.isbn);
  if (!book) return response.status(404).json({ error: "Not found" });
  book = { isbn, title, year, author };
  response.json(book);
});

/**
 * @openapi
 * /books/{isbn}:
 *   delete:
 *     tags:
 *       - books
 *     summary: Deletes a book with a specific ISBN
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Not found
 */
//---------------------------------------------------------------------
app.delete("/books/:isbn", isAuthenticated, (request, response) => {
  const bookIndex = books.findIndex(
    (book) => book.isbn === request.params.isbn
  );
  if (bookIndex === -1)
    return response.status(404).json({ error: "Not found" });
  books.splice(bookIndex, 1);
  response.status(204).send();
});

/**
 * @openapi
 * /books/{isbn}:
 *   patch:
 *     tags:
 *       - books
 *     summary: Partially updates a book with a specific ISBN
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isbn:
 *                 type: string
 *               title:
 *                 type: string
 *               year:
 *                 type: integer
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated book object
 *       404:
 *         description: Not found
 */
//---------------------------------------------------------------------
app.patch("/books/:isbn", isAuthenticated, (request, response) => {
  const book = books.find((book) => book.isbn === request.params.isbn);
  if (!book) return response.status(404).json({ error: "Not found" });
  const { isbn, title, year, author } = request.body;
  if (isbn) book.isbn = isbn;
  if (title) book.title = title;
  if (year) book.year = year;
  if (author) book.author = author;
  response.json(book);
});

/**
* @openapi
* /lends:
*   get:
*     tags:
*       - lends
*     summary: Returns a list of all lends
*     responses:
*       200:
*         description: A JSON array of all lends
*/
//---
app.get("/lends", isAuthenticated, (request, response) => {
  response.json(lends);
});

/**
 * @openapi
 * /lends/{id}:
 *   get:
 *     tags:
 *       - lends
 *     summary: Returns a lend with a specific ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A lend object
 *       404:
 *         description: Not found
 */
//---
app.get("/lends/:id", isAuthenticated, (request, response) => {
  const lend = lends.find((lends) => lends.id === Number(request.params.id));
  if (!lend) return response.status(404).json({ error: "Not found" });
  response.json(lend);
});

/**
 * @openapi
 * /lends:
 *   post:
 *     tags:
 *       - lends
 *     summary: Create a new lend
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *                 description: The ID of the customer borrowing the book.
 *               isbn:
 *                 type: string
 *                 description: The ISBN of the book being borrowed.
 *     responses:
 *       200:
 *         description: The created lend object.
 *       400:
 *         description: Bad request.
 *       422:
 *         description: Unprocessable entity.
 */
//---
app.post("/lends", isAuthenticated, (request, response) => {
    
  if(!request.body || !request.body.customer_id || !request.body.isbn || request.body.isbn){
      console.log("");
      console.log("ERROR 422: Faulty data.");
      response.status(422).send("ERROR 422: Faulty data.");
      return;
  }

  const lendsList = JSON.parse(fs.readFileSync("lends.json", "utf-8"));
  let newLend = request.body;
  newLend.id = request.body.id ?? uuidv4();
  newLend.borrowed_at = request.body.borrowed_at ?? new Date().toLocaleString("de-CH");

  if(lendsList.find(lend => lend.id == newLend.id)){
      console.log("");
      console.log("ERROR 422: Resource with id " + newLend.id + " already exists.");
      response.status(422).send("ERROR 422: Resource with id " + newLend.id + " already exists.");
      return;
  }

  lendsList.push(newLend);
  
  fs.writeFileSync("lends.json", JSON.stringify(lendsList));
  response.status(200).send(newLend);
});

/**
 * @openapi
 * /lends/{id}:
 *   delete:
 *     tags:
 *       - lends
 *     summary: Delete a lend by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The lend was successfully deleted.
 *       404:
 *         description: The lend with the specified ID was not found.
 */
//---
app.delete("/lends/:id", isAuthenticated, (request, response) => {
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