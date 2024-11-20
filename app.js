const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
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

// Létrehozás
app.post('/api/users', bodyParser.json(), (req, res) => {
    const newUser = {
        id: req.body.id,
        name: req.body.name
    };
    let users = [];

    
    fs.readFile('users.json', (err, data) => {
        if(err)
            console.error(err);
        
        users = JSON.parse(data);
        users.push(newUser);

        fs.writeFile('users.json', JSON.stringify(users), (error) => {
            if(error)
                console.error(error);
            res.status(201).send(users);
        });
    });
    //res.send(req.body)
});

// Összes felhasználó
app.get('/api/users', (req, res) => {
    fs.readFile('users.json', (err, data) => {
        if(err)
            console.error(err);
        res.status(200).send(JSON.parse(data));
    });
});

// Egy felhasználó
app.get('/api/users:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('users.json', (err, data) => {
        if(err)
            console.error(err);

        const users = JSON.parse(data);
        // let user = users.filter(u => u.id == id);
        let user = {};
        for(let i of users) {
            if(i.id == id) {
                user = i;
            }
        }
        res.status(200).send(user);
    });
});

// Szerkesztés
app.put('/api/user:id', bodyParser.json(), (req, res) => {
    const id = req.params.id;
    let users = [];

    fs.readFile('users.json', (err, data) => {
        if(err)
            console.error(err);
        
        users = JSON.parse(data);
        users.forEach(u => {
            if(u.id === id) {
                u.name = req.body.name
            }
        });

        fs.writeFile('users.json', JSON.stringify(users), (error) => {
            if(error)
                console.error(error);
            res.status(200).send(JSON.stringify(users));
        });
    });
});

// Törlés
app.delete('/api/user:id', (req, res) => {
    const id = req.params.id;
    let users = [];

    fs.readFile('users.json', (err, data) => {
        if(err)
            console.error(err);
        
        let newUsers = [];
        users = JSON.parse(data);
        users.forEach(u => {
            if(u.id != id)
                newUsers.push(u);
        });

        fs.writeFile('users.json', JSON.stringify(users), (error) => {
            if(error)
                console.error(error);
            res.status(204).send(JSON.stringify(newUsers));
        });
    });
});

app.listen(3000);
