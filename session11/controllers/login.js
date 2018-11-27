module.exports.renderLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

module.exports.renderSignUp = (req, res) => {
  res.render('signup', { title: 'Signup' });
};
