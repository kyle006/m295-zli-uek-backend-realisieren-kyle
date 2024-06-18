//second way
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./server.js']

const doc = {
    info: {
        title: 'Library',
        description: 'Meine tolle Bibliothek API'
    },
    host: 'localhost:3000',
    definitions: {
        Book: {
            isbn: "string",
            title: "string",
            year: "number",
            author: "string"
        },
        Lend: {
            id: "number",
            customer_id: "string",
            isbn: "string",
            borrowed_at: "string",
            returned_at: "string"
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')
});