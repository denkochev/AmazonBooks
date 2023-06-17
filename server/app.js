require("dotenv").config();
const express = require('express');
// get MongoDB driver connection
const dbo = require('./db/connection');
const cors = require('cors');
// get function for show dbs
const showDBs = require('./db/showDatabases');
const {ObjectId} = require('mongodb');

const PORT = process.env.PORT;
const app = express();

// middleware methods
app.use(cors(),express.json());

// get all words from collection
app.get('/books', (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection('books')
        .find({})
        .limit(30)
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

// sort collection
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

// add new books to the collection
app.post('/books/add', (req, res) => {
    if(!req.body){
        res.status(400).send('Error inserting matches!');
    }

    // manage publishedDate key to ISO standart
    const newBooks = req.body.map((book)=>{
        ("publishedDate" in book)? book.publishedDate = new Date(book.publishedDate) : null;
        return book;
    });

    const dbConnect = dbo.getDb();

    dbConnect
        .collection('books')
        .insertMany(newBooks, function (err, result) {
            if (err) {
                res.status(400).send('Error inserting matches!');
            } else {
                res.send(result);
            }
        });
});

// edit document in collection
app.put('/books/update/:id', (req, res) => {
    console.log(req.body)
    if(!req.body){
        res.status(400).send('Error fetching listings!');
        return;
    }

    const dbConnect = dbo.getDb();

    const id = (isNaN(req.params.id)) ? new ObjectId(req.params.id) : Number(req.params.id);
    const editedBook = req.body;

    ("publishedDate" in editedBook)? editedBook.publishedDate = new Date(editedBook.publishedDate) : null;

    dbConnect
        .collection('books')
        .replaceOne({_id: id}, editedBook, function (err, result) {
            if (err) {
                res.status(400).send('Error fetching listings!');
            } else {
                res.json(result);
            }
        });
});

// delete documents from collection
app.delete('/books/deletemany', (req, res) => {
    const dbConnect = dbo.getDb();

    const idArray = req.body;
    const objectIds = idArray.map(id => {
        if (typeof id === 'number') {
            return id;
        } else if (typeof id === 'string') {
            return new ObjectId(id);
        }
    });

    dbConnect
        .collection('books')
        .deleteMany({_id: {$in: objectIds}}, function (err, result) {
            if (err) {
                res.status(400).send('Error fetching listings!');
            } else {
                res.json(result);
            }
        });
});


// show all databases
app.get('/getdatabases', async (req, res) => {
    const databases = await showDBs.showDatabases()
        .catch(err => {
            res.status(400).send('ПОМИЛКА ДОСТУПУ! ' + err);
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