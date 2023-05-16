const express = require('express');
// get MongoDB driver connection
const dbo = require('./db/connection');
const cors = require('cors');
// get function for show dbs
const showDBs = require('./db/showDatabases');

const PORT = 5050;
const app = express();

app.use(cors());
// middleware method
app.use(express.json());

// get all words from collection
app.get('/books', (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection('books')
        .find({})
        .limit(20)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send('Error fetching listings!');
            } else {
                res.json(result);
            }
        });
})

// find by word
app.get('/books/:word', (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection('books')
        .find({$text: {$search: `${req.params.word}`, $caseSensitive: true}})
        .limit(30)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send('Error fetching listings!');
            } else {
                res.json(result);
            }
        });
});

// sort database
app.get('/books/sortby/:opt', (req, res) => {
    const dbConnect = dbo.getDb();

    const option = req.params.opt;

    const query = {};
    query[option] = {$exists: true};

    dbConnect
        .collection('books')
        .find(query)
        .limit(30)
        .sort({[option]: 1})
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


// show all databases
app.get('/getdatabases', async (req, res) => {
    const databases = await showDBs.showDatabases()
        .catch(err => {
            res.status(400).send('ПОМИЛКА ДОСТУПУ! '+err);
        });

    res.status(200).json(databases)
});

// get collections from db
app.get('/getcollections', (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect.listCollections().toArray((err, collections) => {
        if (err) {
            console.error('Помилка отримання списку колекцій:', err);
            res.status(500).send('Помилка сервера');
            return;
        }

        // Отправка списку колекцій у відповідь
        const collectionNames = collections.map(collection => collection.name);
        res.json(collectionNames);
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