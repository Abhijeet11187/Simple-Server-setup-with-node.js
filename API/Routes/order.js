const express=require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"In the get of orders"
    })
})

router.get('/:orderId',(req,res,next)=>{
    const orderId=req.params.orderId;
    res.status(200).json({
        message:"Id obtained",
        id:orderId
    });
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'In the post of Order'
    })
})


module.exports=router;