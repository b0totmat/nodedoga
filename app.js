const express = require('express');
const app = express();

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

app.listen(3000);
