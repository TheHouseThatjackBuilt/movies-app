const errorHandler = (err) => {
  alert(`это пиздец ${err.message}`);
  return { status: true, message: err.message ? err.message : 'unexpected error' };
};

export default errorHandler;
