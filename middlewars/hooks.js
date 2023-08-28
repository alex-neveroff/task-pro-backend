export const handleMongooseError = (error, data, next) => {
  error.status = 400;
  next();
};

export const validateAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};
