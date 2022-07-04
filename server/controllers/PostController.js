const Post = require("../models/Post");

/**
 * Get all posts 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getPosts = async( req,res,next) => {
    Post.find(req.quert)
    .then((post)=>{
        res.status(200).send(post);
    },(err) => next(err))
    .catch(err => next(err));
}
/**
 * Create new post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const createPost = async (req,res,next) => {
    if (req.body != null) {
        Post.create({
            title: req.body.title,
            text:req.body.text,
            // postedBy:req.user._id,
        })
        .then((post) => {
            res.status(200).send(post);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
        err = new Error('post not found in request body');
        err.status = 404;
        return next(err);
};

/**
 * Update post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const updatePost = (req, res,next) => {
    Post.findById(req.params.postId)
    .then((post) => {
        if (post != null) {
            Post.findByIdAndUpdate(req.params.postId, {
                $set: req.body
            }, { new: true })
            .then((post) => {
                res.status(200).send(post);             
            }, (err) => next(err));
        }
            err = new Error('Post ' + req.params.postId + ' not found');
            err.status = 404;
            return next(err);            
    }, (err) => next(err))
    .catch((err) => next(err));
  };
  /**
   * Get single post by id
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
const getSinglePost = (req,res,next) => {
    Post.findById(req.params.postId)
    .then((post) => {
        res.status(200).send(post);   
    }, (err) => next(err))
    .catch((err) => next(err));
}

/**
 * Delete post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const destroyPost = (req,res,next) => {
    Post.findById(req.params.postId)
    .then((post) => {
        if (post != null) {
            Post.findByIdAndRemove(req.params.postId)
            .then((post) => {
                res.status(200).send(post);   
            }, (err) => next(err))
            .catch((err) => next(err));
        }
            err = new Error('Post ' + req.params.postId + ' not found');
            err.status = 404;
            return next(err);            
    }, (err) => next(err))
    .catch((err) => next(err));
}
module.exports = {
    getPosts,
    createPost,
    updatePost,
    getSinglePost,
    destroyPost
}


