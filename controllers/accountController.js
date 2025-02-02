const utilities = require("../utilities/")
const accountModel = require("../models/account-model")



/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
    })
  }

  /* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    let messages = [];  

    if (req.flash("success")) {
        messages.push({ text: req.flash("success")[0] });
    }
    res.render("account/register", {
      title: "Register",
      nav,
      errors: null,
    })
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  console.log("Formulario recibido:", req.body); // Verifica si se reciben los datos correctamente

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav, messages: req.flash('notice'),
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav, messages: req.flash('notice'),
    })
  }
}
  



module.exports = { buildLogin, buildRegister, registerAccount }