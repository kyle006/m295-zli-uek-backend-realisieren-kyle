const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./server.js', './server.js']

const doc = {
    info: {
        title: 'Library',
        description: 'Meine tolle Bibliothek API'
    },
    host: 'localhost:3000',
    definitions: {
        Lend: {
            id: 1,
            customer_id: "1234567890",
            isbn: "1",
            borrowed_at: "2024-05-14T09:06:05.439Z"
        },
        Return: {
            id: 2,
            customer_id: "0987654321",
            isbn: "2",
            returned_at: "2024-06-14T09:06:05.439Z"
        }
    },
    paths: {
        "/lends": {
            "get": {
                tags: ["Lend"],
                // Rest of the endpoint definition
            },
            "post": {
                tags: ["Lend"],
                // Rest of the endpoint definition
            }
        },
        "/returns": {
            "get": {
                tags: ["Return"],
                // Rest of the endpoint definition
            },
            "post": {
                tags: ["Return"],
                // Rest of the endpoint definition
            }
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')
});