const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// npm install express -> npm install -g express / npm install body-parser -> npm install -g body-parser
// 위의 방법으로 오류해결
// app.use(bodyParser.json()); // 더이상 사용되지 않는 문법
// app.use(bodyParser.urlencoded({ extended: true }));// 더이상 사용되지 않는 문법
app.use(express.json()); // 더이상 사용되지 않는 문법
app.use(express.urlencoded({ extended: true }));// 더이상 사용되지 않는 문법
app.use(express.json());

// app.get('/api/hello', (req, res) => {
//     res.send({ message: 'Hello Express!' });
// });

app.get('/api', (req, res)=>{ // client 접속시 아래 내용 반환 
  res.send({message:'Welcome my world!!'});
});

app.get('/api/customers', (req, res)=>{ // client 접속시 아래 내용 반환 
    res.send([
        {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': '신현석',
        'birthday': '19960525',
        'gender': '남',
        'job': '대학생',
        'major': '아주대 소프트웨어'
        },
        {
        'id': 2,
        'image': 'https://placeimg.com/64/64/2',
        'name': '신현석인데요?',
        'birthday': '19971101',
        'gender': '남',
        'job': 'sk회사원',
        'major': '아주대 기계공'
        },
        {
        'id': 3,
        'image': 'https://placeimg.com/64/64/3',
        'name': '신현석이라는 것...',
        'birthday': '20000218',
        'gender': '남',
        'job': '삼성직원',
        'major': '아주대 전자공'
      }]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));