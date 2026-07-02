const express = require('express');
const cors = require('cors');


const app = express();

// 这个记得放在路由前面解析，不然路由拿到的body是乱码
app.use(express.urlencoded({ extended: false }));

const userRouter = require('./router/user');
app.use('/api', userRouter);

app.use(cors());


// app.use(express.json());

app.listen(3007, () => {
    console.log('Server is running on http://127.0.0.1:3007');
})