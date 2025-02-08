const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


/* ***************************
 *  Build inventory detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const invId = req.params.invId; 
  const data = await invModel.getInventoryById(invId); 
  const detailsHtml = utilities.buildVehicleDetail(data); 
  let nav = await utilities.getNav();
  
  if (data) {
    res.render("./inventory/detail", {
      title: `${data.inv_make} ${data.inv_model}`, 
      nav,
      detailsHtml,
    });
  } else {
    res.status(404).render("./inventory/error", {
      title: "Vehicle Not Found",
      nav,
      message: "The vehicle you are looking for does not exist.",
    });
  }
};

/* ***************************
 *  Show Inventory Management View
 * ************************** */
invCont.showManagementView = async function (req, res) {
  let nav = await utilities.getNav();
  const messages = req.flash("notice") || [];

  const classificationDropdown = await utilities.buildClassificationList();

  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    messages,
    classificationDropdown,
  });
};

/* ***************************
 *  Show Classication Form
 * ************************** */
invCont.showAddClassificationForm = async function (req, res) {
  let nav = await utilities.getNav();
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    message: null,
  });
};

/* ***************************
 *  Add Classification
 * ************************** */
invCont.processAddClassification = async function (req, res) {
  const { classification_name } = req.body;

  if (!classification_name || !/^[a-zA-Z0-9]+$/.test(classification_name)) {
    let nav = await utilities.getNav();
    return res.status(400).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      message: "Invalid classification name. Only letters and numbers allowed.",
    });
  }

  
  const insertResult = await invModel.addClassification(classification_name);
  if (insertResult) {
    req.flash("notice", "Classification added successfully!");
    res.redirect("/inv"); 
  } else {
    let nav = await utilities.getNav();
    res.status(500).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      message: "Database error: Could not add classification.",
    });
  }
};


/* ***************************
 *  Show Form to Add a Inventary
 * ************************** */
invCont.showAddInventoryForm = async function (req, res) {
  let nav = await utilities.getNav();
  let classificationDropdown = await utilities.buildClassificationList();

  res.render("./inventory/add-inventory", {
    title: "Add Inventory Item",
    nav,
    classificationDropdown,
    message: null, 
    inv_make: null,
    inv_model: null,
    inv_year: null,
    inv_description: null,
    inv_image: null,
    inv_thumbnail: null,
    inv_price: null,
    inv_miles: null,
    inv_color: null,
  });
};


/* ***************************
 *  Process to Add Inventory
 * ************************** */
invCont.processAddInventory = async function (req, res) {
  let nav = await utilities.getNav();
  let classificationDropdown = await utilities.buildClassificationList();

  const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body;

  if (!classification_id || !inv_make || !inv_model || !inv_year || !inv_description || !inv_image || !inv_thumbnail || !inv_price || !inv_miles || !inv_color) {
    return res.status(400).render("./inventory/add-inventory", {
      title: "Add Inventory Item",
      nav,
      classificationDropdown,
      message: "All fields are required.", 
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });
  }

  const insertResult = await invModel.addInventoryItem(classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color);

  if (insertResult) {
    req.flash("notice", "New vehicle added successfully.");
    return res.redirect("/inv"); 
  }
};

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id);
  const invData = await invModel.getInventoryByClassificationId(classification_id);
  
  if (invData.length > 0 && invData[0].inv_id) {
    return res.json(invData);
  } else {
    next(new Error("No data returned"));
  }
}


module.exports = invCont