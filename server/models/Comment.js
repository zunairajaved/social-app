const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    comment:{
        type:String,
        trim:true,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},
{
    timestamps:true
});

mongoose.exports = mongoose.model('Comment',commentSchema);