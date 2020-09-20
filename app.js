const express = require('express');
const morgan = require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const productsRoutes = require('./API/Routes/product');
const orderRoutes = require('./API/Routes/order');
const app = express();

console.log("In the app.js ");

// Connection to MongoDb

const connectDB = async () => {
    try {
    const connection = await mongoose.connect(
        'mongodb+srv://Abhi:'+process.env.mongooseATLAS_password+'@node-rest-shop-yakve.mongodb.net/test?retryWrites=true&w=majority',
    {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    }
    )
    console.log('**************************************** MongoDB Server connected ************************************');
    } catch (error) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MongoDB error when connecting: ${error} !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }
    }
    connectDB()

//+++++++++

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS eror handling here (You cannot encounter CORS errors while using PostMan because Postman is not browser its just testing tool)
//CORS errors happen when Cross Origin Request is made (Another Webpage cannot access to our API)

app.use((req,res,next)=>{

    //Two headers are added here to resolve CROS error
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );

    //Browser send OPTION req first when you want to send post request
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        // OPTIONS request is just for finding out which options we have so we have to return the response
        return res.status(200).json({});
    }
    next();
});

//Routes to handle the request

app.use('/products', productsRoutes);
app.use('/order', orderRoutes);

// Handling the error 

app.use((req, res, next) => {
    const error = new Error('URL not found');
    error.status = 404;
    console.log("Error status code is set");
    next(error);
})
app.use((error,req, res, next) => {
    console.log("In the next handling")
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
// app.use((req,res,next)=>{
//     res.status(200).json({
//         asd:"sda"
//     })
// })
module.exports = app;