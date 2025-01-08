import express from 'express'
import sqlite3 from 'sqlite3'

const app = express()
const db = new sqlite3.Database('db.sqlite3')

/*
    Book {
        id
        title
        author
        description
        year
    }
*/

const books = [
    {
        id: 1,
        title: 'Könyv1',
        description: '...',
        author: 'Author1',
        year: 1988
    },
    {
        id: 2,
        title: 'Könyv2',
        description: '...',
        author: 'Author2',
        year: 2012
    },
    {
        id: 3,
        title: 'Könyv3',
        description: '...',
        author: 'Author3',
        year: 1752
    }
]

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS books')
    db.run('CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, description TEXT, year INTEGER)')

    for(const b of books) {
        db.run('INSERT INTO books (title, author, description, year) VALUES (?, ?, ?, ?)', [b.title, b.author, b.description, b.year], function(err) {
            if(err) {
                console.log(err)
            }
        })
    }
})

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Books</h1>')
})

// All books
app.get('/books', (req, res) => {
    db.all('SELECT * FROM books', (err, data) => {
        if(err) {
            console.log(err)
        }

        if(!data) {
            return res.json({ 'error': 'No data' })
        }
        res.json(data)
    })
})

// Get book by id
app.get('/books/:id', (req, res) => {
    db.get('SELECT * FROM books WHERE id = ?', req.params.id, (err, data) => {
        if(err) {
            console.error(err)
            return res.json({ error: err.message })
        }

        if(!data) {
            return res.json({ error: 'No data' })
        }

        res.json(data)
    })
})

// New book
app.post('/books', (req, res) => {
    db.run('INSERT INTO books (title, author, description, year) VALUES (?, ?, ?, ?)', [
        req.body.title,
        req.body.author,
        req.body.description,
        Number(req.body.year)
    ],
        function(err) {
        if(err) {
            console.error(err)
            return res.json({ error: err.message })
        }
        res.json({
            id: this.lastID,
            ...req.body
        })
    })
})

// Modify a book
app.put('/books/:id', (req, res) => {
    db.run('UPDATE books SET title = ?, author = ?, description = ?, year = ? WHERE id = ?',
        [
            req.body.title,
            req.body.author,
            req.body.description,
            Number(req.body.year),
            req.params.id
        ],
        function(err) {
            if(err) {
                console.error(err)
                return res.json({ error: err.message })
            }
            res.json({
                id: req.params.id,
                ...req.body
            })
        }
    )
})

app.listen(3000)
