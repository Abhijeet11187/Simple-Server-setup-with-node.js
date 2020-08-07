const express = require('express');
const morgan = require('morgan');
const productsRoutes = require('./API/Routes/product');
const orderRoutes = require('./API/Routes/order');
const app = express();

console.log("In the app.js ");
app.use(morgan('dev'));
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
    console.log("In the next hanling")
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