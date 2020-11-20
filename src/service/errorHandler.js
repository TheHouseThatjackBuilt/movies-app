const errorHandler = (err) => ({ errorStatus: true, errorMessage: err.message ? err.message : 'unexpected error' });

export default errorHandler;
