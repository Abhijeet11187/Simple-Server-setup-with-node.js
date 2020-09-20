const express=require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Order=require('../Models/order');

console.log("In the Order.js router file");

router.get('/',(req,res,next)=>{

   Order.find()
   .populate('product','name') //Second argument here is behave like SELECT !  what field you want to select 
   .exec()
   .then(documents=>{
       const response={
           totalCount:documents.length,
           orders:documents.map((order)=>{
               return {
                    _id:order._id,
                    orderName:order.orderName,
                    product:order.product,
                    metadata:{
                        message:"You can provide Metada over here "
                    }
               }
            })
        }
        res.status(200).json(response);
   })
   .catch(error=>{
       const errorResponse={
           "Error occur During Find Orders":error
       }
       res.status(500).json(errorResponse);
   })
})

router.get('/:orderId',(req,res,next)=>{
  Order.findById({_id:req.params.orderId}).exec().then(result=>{
      res.status(200).json({
          "Record Found":result
      })
  })
  .catch(error=>{
    res.status(500).json({
        Error:error
    })
  })    
})

router.post('/',(req,res,next)=>{
     const order=Order(
         {
             _id: new mongoose.Types.ObjectId(),
             orderName:req.body.orderName,
             product:req.body.product,
         }
     );
     order
     .save()
     .then(result=>{
        res.status(200).json({
            Created:result,
        })
     })
     .catch(err=>{
         console.log("Encounter error ",err)
     })
});

router.patch('/:orderId',(req,res,next)=>{
    const id=req.params.orderId;
    const UpdateOperations={};
            for(const ops of req.body)
            {
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
})

router.delete('/:orderId',(req,res,next)=>{
    Order.deleteOne({_id:req.params.orderId})
    .exec()
    .then(result=>{
       const response={
           "Order Deleted ":result
       }
       res.status(200).json(response)
    })
    .catch(error=>{
        const errorResponse={
            "Error while Delete":error
        }
        res.status(500).json(errorResponse)
    })
})

module.exports=router;