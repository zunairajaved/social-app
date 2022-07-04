var express = require('express');
var router = express.Router();
const postController = require('../controllers/PostController');
const auth = require('../middleware/auth')
const multer = require('multer');
const Post = require("../models/Post");
/* GET users listing. */
// router.get('/', auth, function(req, res, next) {
//   res.send('respond with a resource');
// });
/**
 * File storage using multer
 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });
router.post('/create',postController.createPost);
router.post('/upload/:postId',upload.single('image'),async function(req,res){
  var postId = req.params.postId;
  var post = await Post.findById(postId);
  console.log(req.file);
  post.thumbnail = req.file.filename;
  post.save();
  res.status(200).send({message:'uploaded successfully'});
  });
router.put('/update/:postId',postController.updatePost);
router.get('/',postController.getPosts);
router.delete('/detroy/:postId',postController.destroyPost);
router.get('/single/:postId',postController.getSinglePost);

module.exports = router;