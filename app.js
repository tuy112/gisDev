const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
const path = require('path');

app.use(cors());


// HTML, CSS
app.use(express.static(path.join(__dirname, 'assets')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

app.listen(port, () => {
  console.log(port, '포트가 열렸습니다~^^');
});