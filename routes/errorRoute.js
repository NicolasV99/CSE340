const express = require("express");
const router = express.Router();
const errorController = require("../controllers/errorController");

// Ruta que genera un error 500
router.get("/trigger-error", errorController.generateError);

module.exports = router;