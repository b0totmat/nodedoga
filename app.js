const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');


app.get('/', (req, res) => {
    res.send('Hi there!');
});

app.get('/express', (req, res) => {
    res.send('Az Express egy minimalista webes keretrendszer, amely a Node.js-hez készült.');
});

app.get('/greeting', (req, res) => {
    res.send('Hello, Tóth Máté');
});

app.get('/nodejs', (req, res) => {
    res.send('A Node.js egy olyan szerveroldali JavaScript futtatókörnyezet, amely a V8 JavaScript motorra épül.');
});

app.post('/api/users', bodyParser.json(), (req, res) => {
    const newUser = {
        id: req.body.id,
        name: req.body.name
    };
    let users = [];

    fs.readFile('users.json', (err, data) => {
        if(err)
            console.error(err);
        
        users = data.json();
        users.push(newUser);

        fs.writeFile('users.json', users, (error) => {
            if(error)
                console.error(error);
            res.sendStatus(201);
        });
    });
});
app.get('/api/users', (req, res) => {
    fs.readFile('users.json', (err, data) => {
        if(err)
            console.error(err);
        res.send(data);
        res.sendStatus(200);
    });
});
app.get('/api/users:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('users.json', (err, data) => {
        for(let i of data) {
            if(i.id === id) {
                res.send(i);
                res.sendStatus(200);
            }
        }
    });
});
app.put('/api/user:id', bodyParser.json(), (req, res) => {
    const id = req.params.id;
    let users = [];

    fs.readFile('users.json', (err, data) => {
        if(err)
            console.error(err);
        
        users = data.json();
        users.forEach(u => {
            if(u.id === id) {
                u.name = req.body.name
            }
        });

        fs.writeFile('users.json', users, (error) => {
            if(error)
                console.error(error);
            res.sendStatus(200);
        });
    });
});
app.delete('/api/user:id', (req, res) => {
    const id = req.params.id;
    let users = [];

    fs.readFile('users.json', (err, data) => {
        if(err)
            console.error(err);
        
        let newUsers = [];
        users = data.json();
        users.forEach(u => {
            if(u.id != id)
                newUsers.push(u);
        });

        fs.writeFile('users.json', newUsers, (error) => {
            if(error)
                console.error(error);
            res.sendStatus(204);
        });
    });
});

app.listen(3000);
