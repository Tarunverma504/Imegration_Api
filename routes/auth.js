const express = require('express');
const router = express.Router();
const {
    registerUser, 
    loginUser
}  = require("../controller/authController");
router.route('/signup').post(registerUser);
router.route('/login').get(loginUser);

module.exports = router;
