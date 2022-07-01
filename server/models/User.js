const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name:{ 
      type: String, 
      default: null 
    },
  last_name:{ 
      type: String, 
      default: null 
    },
  email:{ 
      type: String, 
      unique: true
     },
  password:{ 
      type: String ,
      required: true
    },
    profile_image:{
        type:String
    },
  token:{ 
      type: String 
    },
},
{
    timestamps:true
});

module.exports = mongoose.model("User", userSchema);