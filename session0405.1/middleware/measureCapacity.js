module.exports = (req, res, next) => {
  const time = process.hrtime();

  req.on('end', () => {
    const diff = process.hrtime(time);
    console.log(`Proccess took ${diff[0] * 1e9 + diff[1]} nsec (~ ${diff[0]} sec)`);
  });

  next();
};
