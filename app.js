const express = require('express');
const cors = require('cors');
const config = require('./config');
const joi = require('joi');
const { expressjwt: expressJwt } = require('express-jwt');

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

app.use(expressJwt({ secret: config.jwtSecret, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }));

const userRouter = require('./router/user');
const userinfoRouter = require('./router/userinfo');
app.use('/api', userRouter);
app.use('/my', userinfoRouter);
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败')
    }
    res.cc(err)
})


// app.use(express.json());

app.listen(3007, () => {
    console.log('Server is running on http://127.0.0.1:3007');
})
