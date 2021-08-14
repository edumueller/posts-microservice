const express = require('express');

const PORT = 4000;
const app = express();

app.get('/posts', (req, res) => {

});

app.post('/posts', (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});