const errorController = {};

// Controlador que genera un error 500
errorController.generateError = (req, res, next) => {
  const error = new Error("Intentional Server Error");
  error.status = 500;
  next(error);
};

module.exports = errorController;