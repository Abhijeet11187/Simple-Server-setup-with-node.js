const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "In the get of Product js"
    });
});

router.get('/:productId',(req,res,next)=>{
    const id=req.params.productId;
    res.status(200).json({
          idis:"id is id",
          id:id
    })
})
router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:"In the post of products"
    })
})

module.exports=router;