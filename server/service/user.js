/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { encrypt, decrypt } = require('./encryption');
const { User } = require('../models/schemas');

const page = {

  v_sign_up2: async (req, res) => {
    // destruct request params
    const {
      first_name, last_name, contact, address,
    } = req.body;
    // const {place} = req.place;
    // console.log(place);
    if (!first_name || !last_name || !contact) {
      return res.status(404).json(
        {
          message: 'Bad Request',
        },
      );
    }
    const new_user = User({
      first_name,
      last_name,
      contact,
      address,
    });
    User.findOne({ contact }).exec((err, doc) => {
      if (err) {
        return res.status(500).json({
          message: 'Database error',
        });
      }

      // dont save if doc is not empty, return the appropriate response
      if (doc) {
        return res.status(401).json({
          message: 'user already exists',
        });
      }
      //  SAVE if  doc = {}
      if (doc === null) {
        new_user.save().then((result) => {
          console.log(result);
          const text = JSON.stringify(encrypt(JSON.stringify({ id: result._id })));
          console.log(text);
          res.status(201).json({
            message: `User (${result.name}) created and registered`,
            id: result._id,
            text,

          });
        });
      }
    });
  },

  // return the html version of the requested file
  v_login: async (req, res, next) => {
    const { email, password } = req.body;
    if (email === null || email === undefined
      || password === null || password === undefined
    ) {
      console.log('Bad request');
      return res.status(404).json({
        message: 'Bad request',
      });
    }
    User.findOne({ email }).exec((err, doc) => {
      if (err) {
        console.log(err);
        console.log('Internal server request');
        return res.status(500).json({ error: err });
      }

      if (doc === null) {
        console.log('not registered request');
        return res.status(404).json({ message: 'Username or password is incorrect' });
      }
      // const {password} = req.body;
      req.user = doc;
      next();
    });
  },
  v_sign_token: async (req, res) => {
  // if user log in success, generate a JWT token for the user with a secret key
    jwt.sign({ _id: req.user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.log(err);
        console.log('internal server request');
        return res.sendStatus(500);
      }
      res.status(200).json({
        message: 'Logged in successfully',
        id: req.user._id,
        token,
        user: {
          id: req.user._id,
          email: req.user.email,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          address: req.user.address,
          contact: req.user.contact,
        },
      });
    });
  },
  v_compare: async (req, res, next) => {
    const { password } = req.body;
    bcrypt.compare(password, req.user.password, (err, result) => {
    // result == true
      if (err) {
        console.log(err);
        console.log('Internal server error');
        return res.status(500).json({ error: err });
      }
      if (result) {
      // if user log in success, generate a JWT token for the user with a secret key

        next();
      } else {
        console.log('Invalid username or password');
        res.status(404).json({
          message: 'username or password',
        });
      }
    });
  },
  v_hash: async (req, res) => {

  },

  // 
  v_sign_up: async (req, res) => {
    const {
      email, contact, id, first_name, last_name, address, password,
    } = req.body;
    if (email === null || email === undefined
      || contact === null || contact === undefined
    ) {
      console.log('Bad request');
      return res.status(404).json({
        message: 'Bad request',
      });
    }
    User.find({ email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: 'User exists',
          });
        }
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          }
          const newuser = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            first_name,
            last_name,
            address,
            contact,
            password: hash,
          });
          newuser
            .save()
            .then((result) => {
              console.log(result);

              // if user log in success, generate a JWT token for the user with a secret key
              jwt.sign({ _id: result._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) { console.log(err); return res.sendStatus(401); }
                res.status(201).json({
                  message: 'Employee created',
                  token,
                  user: {
                    id: result._id,
                    email: result.email,
                    first_name: result.first_name,
                    last_name: result.last_name,
                    address: result.address,
                    contact: result.contact,
                  },

                });
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                error: err,
              });
            });
        });
      });
  },

};
module.exports = page;

