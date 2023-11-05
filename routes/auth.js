const express = require('express');
const router = express.Router();
const {
    registerUser, 
    loginUser,
    addCustomer,
    getUsersList
}  = require("../controller/authController");


router.route('/signup').post(registerUser);
router.route('/login').get(loginUser);
router.route('/add-customer/:id').post(addCustomer);
router.route('/get-users/:id').get(getUsersList);

module.exports = router;
