const express = require('express');
const mongoose=require('mongoose');
const Product=require('../Models/product');
const router = express.Router();

console.log("In the Product.js router file");

const multer = require('multer');

const storage = multer.diskStorage(
    {
        destination:function(req,file,cb){
            cb(null,'uploads/');
        },
        filename:function(req,file,cb){
            cb(null,file.originalname);
        }
    }
);
const upload = multer ({storage:storage});

//Find All Products 

router.get('/', (req, res, next) => {
    Product.find()
    .select('_id name price imagePath')
    .exec()
    .then((documents)=>{
      const response={
           totalCount:documents.length,
           doc:documents,
           products:documents.map(doc =>{
               return {
                   name:doc.name,
                   price:doc.price,
                   _id:doc._id,
                   imagePath:doc.imagePath,
                   metadata:{
                       "value":"You can provide metada here any information you want to send just by iterating with map"
                   }
               }
           })
      };
      res.status(200).json(response)
    })
    .catch((err)=>{
        res.status(500).json(
            {
                error:err
            }
        )
    })
});


// Find by Id

router.get('/:productId',(req,res,next)=>{
    const id=req.params.productId;
  Product.findById(id)
  .exec()
  .then(result=>{
 if(result){
    res.status(200).json(
        {
            message:"Product find",
            result:result
        }
        )
 }else{
     res.status(404).json({
         Error:"No valid Entry Found"
     })
 }
  })
  .catch(err=>{
      res.status(500).json(err);
  })
})


// Posting the Products

//Body parser parses only URL encoded body and JSON bodies so to access the image we cant use req.body because for there binary data is available 
//Instead of that we can use raw  request for accessing the body
//  Multer is alternative to the body parser by using multer we can parse the body

router.post('/',upload.single('productImage'),(req,res,next)=>{
    console.log("In the try",req.file.path);
    console.log("In the product post");
    const product=new Product(
     {
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        imagePath:req.file.path
    }
    );
    console.log("Saving");
    product.save().then(
        result=>{
            console.log("Successfull ",result);
            res.status(200).json({
                'result is':result
            })
        }
    ).catch((err)=>{
        console.log("Error while putting data ",err);
        res.status(500).json({
            message:"Error while Putting the data",
            error:err
        });
    });    
})

//Update the Products

router.patch('/:productId',(req,res,next)=>{
const id=req.params.productId;
const UpdateOperations={};
        for(const ops of req.body)
        {
            console.log("PropnMa e is ",ops.propName)
              UpdateOperations[ops.propName]=ops.value;
        }
 Product.update({_id:id},{
     $set:UpdateOperations
 })
 .exec()
 .then(result=>{
    res.status(200).json({
        Updated:result
        });
 })
 .catch(err=>{
     res.status(500).json({
         'Error While Update':err
     })
 })

});


// Delete the product

router.delete('/:productId',(req,res,next)=>{
    const id=req.params.productId;
    Product.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            'deleted Successfully':result
        })
    }
    )
    .catch(err=>{
        res.status(500).json({error:err})
    })
})


module.exports=router;