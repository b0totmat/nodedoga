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

app.get('/', (req, res) => {
    res.send('<h1>Books</h1>')
})

app.listen(3000)
