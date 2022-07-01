const Post = require("../models/Post");


const getPosts = async( req,res) => {
    Post.find(req.quert)
    .then((post)=>{
        res.status(200).send(post);
    })
    .catch(err =>{
        res.status(500).send({ message: err.message });
    });
}
const createPost = async (req,res) => {
Post.create({
    title: req.body.title,
    text:req.body.text,
    // postedBy:req.user._id,
})
.then((post)=>{
    res.status(200).send(post);
}).catch(err =>{
    res.status(500).send({message:err.message});
});
};
const uploadImage = async(req,res) => {
    console.log("id",req.params.postId);
    var postId = req.params.postId;
    var post = await Post.findById(postId);
    post.thumbnail = req.body.image
    console.log(post);
    post.save({
        thumbnail:req.body.image
    });
    res.status(200).send({message:'image uploaded successfully'});
}

module.exports = {
    getPosts,
    createPost,
    uploadImage
}


