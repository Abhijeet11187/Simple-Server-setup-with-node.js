const mongoose=require('mongoose');

const orderSchema= mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        orderName:{type:String,required:true},
        product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true} //Used for Populating
    }
);

module.exports = mongoose.model('Order',orderSchema); 