const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title:{ 
      type: String, 
      default: null 
    },
  text:{ 
      type: String, 
     },
  thumbnail:{ 
      type: String ,
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    // postedBy:{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:'User'
    // }
},
{
    timestamps:true
});

module.exports = mongoose.model("Post", postSchema);