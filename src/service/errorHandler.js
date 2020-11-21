const errorHandler = (err) => {
  console.log(typeof err);
  return { errorStatus: true, errorMessage: err.message ? err.message : 'unexpected error' };
};

export default errorHandler;
