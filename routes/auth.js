const express = require('express');
const router = express.Router();
const {
    registerUser, 
    loginUser,
    addCustomer,
    getUsersList,
    forgotPassword,
    updatePassword,
    sendInvitation
}  = require("../controller/authController");


router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/add-customer/:id').post(addCustomer);
router.route('/get-users/:id').get(getUsersList);
router.route('/forgot-password').post(forgotPassword);
router.route('/update-password/:id').post(updatePassword);
router.route('/invitation').post(sendInvitation);

module.exports = router;
