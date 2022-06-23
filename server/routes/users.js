var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');
const auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', auth, function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',userController.signup);
router.post('/login',userController.signin);

module.exports = router;
