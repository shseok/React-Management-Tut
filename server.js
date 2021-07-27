const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// npm install express -> npm install -g express / npm install body-parser -> npm install -g body-parser
// 위의 방법으로 오류해결
// app.use(bodyParser.json()); // 더이상 사용되지 않는 문법
// app.use(bodyParser.urlencoded({ extended: true }));// 더이상 사용되지 않는 문법

app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello Express!' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));