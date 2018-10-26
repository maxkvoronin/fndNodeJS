module.exports = (req, res, next) => {
    const logRecord = {
      method: req.method,
      path: req.path,
      variables: req.query,
    };

    console.log(logRecord);

  next();
};

