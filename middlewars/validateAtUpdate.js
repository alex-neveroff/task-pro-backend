const validateAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};

export default validateAtUpdate;
