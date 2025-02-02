// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')


// Route to display login page
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to display registration page
router.get("/register", utilities.handleErrors(accountController.buildRegister))

router.post('/register',
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)


module.exports = router;