const User = require("../models/User");
const config = require("../config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
/**
 * Register new user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const signup = async (req, res) => {

    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          config.secretKey,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
}
/**
 * Login user
 * @param {*} req 
 * @param {*} res 
 */
const signin = async (req,res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            config.secretKey,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
}
/**
 * Get user profile
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getProfile = (req,res,next) => {
    User.findById(req.user._id)
    .then((user) => {
        res.status(200).send(user);   
    }, (err) => next(err))
    .catch((err) => next(err));
}
/**
 * Update user profile
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const updateProfile = (req,res,next)=> {
User.findById(req.user._id)
.then((user) => {
    if (user != null) {
        User.findByIdAndUpdate(req.user._id, {
            $set: req.body
        }, { new: true })
        .then((user) => {
            res.status(200).send(user);             
        }, (err) => next(err));
    }
        err = new Error('Post ' + req.params.userId + ' not found');
        err.status = 404;
        return next(err);            
}, (err) => next(err))
.catch((err) => next(err));
}
module.exports = {
  signup,
  signin,
  getProfile,
  updateProfile,
}
