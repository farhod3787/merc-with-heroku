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


const cors = require("cors");
const app = express();

app.use(cors());


// mongoose.connect('mongodb+srv://farhod:7Q8SfcHx.F2J.HG@cluster0-uf7cc.mongodb.net/mercedec?retryWrites=true', { useNewUrlParser: true })
//     .then(() => {
//         console.log('MongoDB connected.');
//     })
//     .catch(err => console.log(err));

mongoose.connect("mongodb://localhost:27017/mercedec").then( () => {
    console.log('Connected to database')
})
.catch( () =>{
    console.log('Error in connected database')
 });



module.exports = { mongoose };


// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/', express.static(path.join(__dirname, '../dist/online-pharmacy')))

app.use('/images', express.static(path.join("backend/images")));
// app.use('/recipe', express.static(path.join("backend/recipe")));


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



module.exports = app;
