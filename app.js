const express = require('express');
const cors = require('cors');
const joi = require('joi');

const app = express();


app.use(cors());
// 这个记得放在路由前面解析，不然路由拿到的body是乱码
app.use(express.urlencoded({ extended: false }));

// 自定义中间件，封装res.send函数
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

const userRouter = require('./router/user');
app.use('/api', userRouter);

app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    res.cc(err)
})


// app.use(express.json());

app.listen(3007, () => {
    console.log('Server is running on http://127.0.0.1:3007');
})