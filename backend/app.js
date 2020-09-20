const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const categoryRouter = require('./routes/category');
const sub_categoryRouter = require('./routes/sub-categories');
const contactRouter = require('./routes/contact');
const orderRouter = require('./routes/orders');
const newsRouter = require('./routes/news');
const video_newRouter = require('./routes/video-news');
const paymentsRouter = require('./routes/payments')

const config = require('./config/config');

const cors = require("cors");
const app = express();

app.use(cors());

mongoose.connect(config.database).then( () => {
    console.log('Connected to database')
})
.catch( () =>{
    console.log('Error in connected database')
 });


module.exports = { mongoose };


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join("backend/images")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-Width, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next()
});

app.use('/api/admin', adminRouter);
app.use('/api/users/', userRouter);
app.use('/api/products/', productRouter);
app.use('/api/category/', categoryRouter);
app.use('/api/sub-category/', sub_categoryRouter);
app.use('/api/contact/', contactRouter);
app.use('/api/order/', orderRouter);
app.use('/api/news/', newsRouter);
app.use('/api/video-news/', video_newRouter);
app.use('/api/payments/', paymentsRouter);
app.use('/api/clickuz/', require('./routes/clickuz'));



module.exports = app;
