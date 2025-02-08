// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')

// Default account route

//router.get("/", utilities.handleErrors(accountController.buildAccountManagement));
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement));


// Route to display login page
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to display registration page
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process registration request
router.post('/register',
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

// Process the login request
router.post("/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

module.exports = router;