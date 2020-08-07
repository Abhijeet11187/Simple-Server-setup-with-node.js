const express = require('express');
const productsRoutes = require('./API/Routes/product');
const orderRoutes=require('./API/Routes/order');
const app=express();

console.log("In the app.js ");

app.use('/products',productsRoutes);
app.use('/order',orderRoutes);
// app.use((req,res,next)=>{
//     res.status(200).json({
//         asd:"sda"
//     })
// })
module.exports=app;