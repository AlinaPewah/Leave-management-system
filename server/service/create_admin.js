const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { Admin } = require('../models/schemas');

bcrypt.hash('admin', 10, (err, hash) => {
  if (err) {
    return console.log(err);
  }
  const admin = new Admin({
    email: 'admin@lms.com',
    name: 'admin',
    contact: '0812221113',
    password: hash,
  });
  admin
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);

    });
});