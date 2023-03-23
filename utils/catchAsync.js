//used to catch all asynchronous errors - wrap all async functions with this
//make sure all controllers have middleware functions req, res, next
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
