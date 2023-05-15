const express = require('express');
// get MongoDB driver connection
const dbo = require('./db/connection');
const cors = require('cors');

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

// get all words from collection
app.get('/books', (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection('books')
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send('Error fetching listings!');
            } else {
                res.json(result);
            }
        });
})

// find word
app.get('/books/:word', (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection('books')
        .find({$text: {$search: `${req.params.word}`, $caseSensitive: false}})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send('Error fetching listings!');
            } else {
                res.json(result);
            }
        });
});

// add new document to the collection
app.post('/words/add', (req, res) => {
    const dbConnect = dbo.getDb();
    let newDocument = req.body;
    newDocument.date = new Date();

    dbConnect
        .collection('words')
        .insertOne(newDocument, function (err, result) {
            if (err) {
                res.status(400).send('Error inserting matches!');
            } else {
                console.log(`Added a new match with id ${result.insertedId}`);
                res.status(204).send('new word added successfully');
            }
        });
});

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
    if (err) {
        console.error(err);
        process.exit();
    }

    // start the Express server
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
});