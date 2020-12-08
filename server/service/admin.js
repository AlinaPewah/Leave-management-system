const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { encrypt, decrypt } = require('./encryption');
const { User, Admin, House, Plot } = require('../models/schemas');

const page = {

  add_plot: async (req, res) => {
    // destruct request params
    const {
      erf, street, location, price, owner, description,
    } = req.body;
    // const {admin} = req.admin;
    // console.log(admin);
    if (!erf || !location || !price) {
      return res.status(404).json(
        {
          message: 'Bad Request',
        },
      );
    }
    // create new plot
    const new_plot = Plot({
      erf, street, location, price, owner, description,
    });
    // search the plots table to see if it exists alread
    Plot.findOne({ erf, street }).exec((err, doc) => {
      // if there is an error searching
      if (err) {
        return res.status(500).json({
          message: 'Database error',
        });
      }

      // dont save if doc is not empty, return the appropriate response
      if (doc) {
        return res.status(401).json({
          message: 'Plot already exists',
        });
      }
      //  SAVE if  doc = {}
      if (doc === null) {
        new_plot.save().then((result) => {
          console.log(result);
          res.status(201).json({
            message: 'Plot  created and registered',
            id: result._id,

          });
        });
      }
    });
  },
  add_house: async (req, res) => {
    // destruct request params
    const {
      erf, street, location, price, owner, description,
    } = req.body;
    // const {admin} = req.admin;
    // console.log(admin);
    if (!erf || !location || !price) {
      return res.status(404).json(
        {
          message: 'Bad Request',
        },
      );
    }
    // create new plot
    const new_house = House({
      erf, street, location, price, owner, description,
    });
    // search the plots table to see if it exists alread
    House.findOne({ erf, street }).exec((err, doc) => {
      // if there is an error searching
      if (err) {
        return res.status(500).json({
          message: 'Database error',
        });
      }

      // dont save if doc is not empty, return the appropriate response
      if (doc) {
        return res.status(401).json({
          message: 'House already exists',
        });
      }
      //  SAVE if  doc = {}
      if (doc === null) {
        new_house.save().then((result) => {
          console.log(result);
          res.status(201).json({
            message: 'House  created and registered',
            id: result._id,

          });
        });
      }
    });
  },
  // return the html version of the requested file
  login: async (req, res, next) => {
    const { email, password } = req.body;
    if (email === null || email === undefined
      || password === null || password === undefined
    ) {
      console.log('Bad request');
      return res.status(404).json({
        message: 'Bad request',
      });
    }
    // console.log(`email not found ${email}`);
    Admin.findOne({ email }).exec((err, doc) => {
      if (err) {
        console.log(err);
        console.log('Internal server request');
        return res.status(500).json({ error: err });
      }

      if (doc === null) {
        console.log('Admin not registered request');
        console.log(`email not found ${email}`);
        return res.status(404).json({ message: 'Username or password is incorrect' });
      }
      // const {password} = req.body;
      req.admin = doc;
      next();
    });
  },
  sign_token: async (req, res) => {
  // if user log in success, generate a JWT token for the user with a secret key
    jwt.sign({ _id: req.admin._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '22h' }, (err, token) => {
      if (err) {
        console.log(err);
        console.log('internal server request');
        return res.sendStatus(401);
      }
      res.status(200).json({
        message: 'Logged in successfully',
        user: {
          id: req.admin._id,
          name: req.admin.name,
        },
        token,

      });
    });
  },
  compare: async (req, res, next) => {
    const { password } = req.body;
    bcrypt.compare(password, req.admin.password, (err, result) => {
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
  hash: async (req, res) => {

  },

  sign_up: async (req, res) => {
    const {
      email, contact, name, password,
    } = req.body;
    if (email === null || email === undefined
      || contact === null || contact === undefined
    ) {
      console.log('Bad request');
      return res.status(404).json({
        message: 'Bad request',
      });
    }
    Admin.find({ email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: 'Admin exists',
          });
        }
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          }
          const admin = new Admin({
            _id: new mongoose.Types.ObjectId(),
            email,
            name,
            address,
            contact,
            password: hash,
          });
          admin
            .save()
            .then((result) => {
              console.log(result);

              // if user log in success, generate a JWT token for the user with a secret key
              jwt.sign({ _id: result._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '22h' }, (err, token) => {
                if (err) { console.log(err); return res.sendStatus(401); }
                res.status(201).json({
                  message: 'Admin created',
                  id: result._id,
                  token,
                });
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        });
      });
  },

  oapply: async (req, res) => {
    const { text, temperature } = req.body;
    const { _id } = req.admin;
    const parsetxt = JSON.parse(text);
    const { id } = JSON.parse(decrypt(parsetxt));
    // check if markdown is underfined
    User.findOne({ _id: id }).exec((err, doc) => {
      if (err) {
        return res.sendStatus(501);
      }
      if (doc === null) {
        console.log('User not registered');
        return res.status(404).json({
          message: 'This user is not currently registered',
        });
      }

      Admin.findByIdAndUpdate(
        _id,
        // eslint-disable-next-line object-shorthand
        { $push: { active_visitors: { user: doc._id, temperature: temperature } } },
        { safe: true, upsert: true, new: true },
        (err, model) => {
          if (err) { console.log(err); return res.status(500).json(err); }
          console.log(model);
          res.status(200).json({
            message: `${doc.first_name} ${doc.last_name} just clocked in`,
            first_name: doc.first_name,
            last_name: doc.last_name,
          });
        },
      );
    });
    // Admin.findById(page_id).exec((err, doc)=>{

    //   if (err) throw err;
    //   for(let i of doc.users){
    //     if(i.account_id = account_id && i.permission == 'VV' )
    //       return res.sendStatus(403);
    //   }
    //   Admin.updateOne({markdown:markdown},(err, res)=> {
    //     if (err) return res.status(500).json(err);

    //     res.json('Markdown Saved succefully')
    //   });

    // });
  },

  usercount: (req, res) => {
    const { _id } = req.admin;
    Admin.findById(_id).exec((err, docs) => {
      if (err) {
        console.log('Error', err);
        return res.status(500).json({
          message: `Error${err.message}`,
        });
      }
      const cumulative = docs.active_visitors.length;
      const todays = docs.active_visitors.filter((doc) => {
        t = new Date();
        dt = new Date(doc.clock_in);
        console.log(doc.clock_in);
        console.log(t.getTime() - dt.getTime());
        return (t.getTime() - dt.getTime() <= 86400000);
      });

      res.status(200).json({
        total: cumulative,
        todays: todays.length,
      });
    });
  },
  search: (req, res) => {
    const { contact } = req.params;
    if (!contact) {
      console.log('no contact provided');
      return res.status(404).json({
        message: 'Missing Contact',
      });
    }
    User.find({ contact }).exec((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Error searching',
        });
      }
      const finalUsers = [];

      result.map((doc) => {
        const text = JSON.stringify(encrypt(JSON.stringify({ id: doc._id })));
        finalUsers.push({
          name: `${doc.first_name} ${doc.last_name}`,
          text,
        });
      });

      res.status(200).json({ users: finalUsers });
    });
  },
};


module.exports = page;
