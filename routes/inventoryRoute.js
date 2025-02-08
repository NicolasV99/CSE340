// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:invId", invController.buildByInvId);
router.get("/", invController.showManagementView);

router.get("/add-classification", invController.showAddClassificationForm);
router.post("/add-classification", invController.processAddClassification);

router.get("/add-inventory", invController.showAddInventoryForm);
router.post("/add-inventory", invController.processAddInventory);

// Route to get inventory items as JSON
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));


module.exports = router;