const Joi = require('joi');
const path = require('path');

const schema = Joi.object().keys({
  username: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required()
});

module.exports.getContactPage = (req, res) => {
  res.sendFile(path.resolve('public/contact.html'));
};

module.exports.checkContactForm = (req, res) => {
  const result = Joi.validate({
    username: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    message: req.body.message
  }, schema);

  if (result.error === null) {
    res.status(201).end();
  } else {
    res.status(400).send(result.error);
  }
};
