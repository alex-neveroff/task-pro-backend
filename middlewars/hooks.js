export const handleMongooseError = (error, data, next) => {
  // error.status = 400;
  // next();
  const { code, name } = error;
  error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  next();
};

export const validateAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};
