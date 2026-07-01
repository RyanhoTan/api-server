const express = require('express');
const cors = require('cors');


const app = express();


const userRouter = require('./router/user');
app.use('/api', userRouter);

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.listen(3007, () => {
    console.log('Server is running on http://127.0.0.1:3007');
})