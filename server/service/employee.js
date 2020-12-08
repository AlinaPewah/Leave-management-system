const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const path = require('path')
// const Departments = require('../models/leaverequests');
const Employee = require('../models/employee')
const { uploadPicMiddleware} = require('../middleware/upload')

exports.employees= (req, res) => {
  Employee.find({}, 'active name surname email days _id profile_pic designation').exec((err, docs) => {
    if(err) {
        console.log(err);
        return res.status(500).json({})
    }
    res.status(200).json(docs);
  });
}

exports.update_propic = async (req, res) => {
  const { emp_id} = req.body;

  let emp = await Employee.findById(emp_id, 'active name surname email days _id profile_pic designation').catch(err => {
    console.log(err);
    res.status(500).json("User not found")
  })

  if(!emp) return;

  emp.profile_pic = req.pic_file
  
  let updated = await emp.save().catch(err => {console.log(err); res.status(500).json(err)})

  if(!updated) return;

  res.status(200).json({message:"Profile Updated", profile_pic: req.pic_file})

}
exports.uploadPic = async (req, res,next) => {

  try {
    await uploadPicMiddleware(req, res);
    
    if (!req.file) {
      return res.status(400).json(`You must select at least 1 file.`);
    }
    
    // console.log(req.new_files);
    // console.log(req.body);
     next();
    
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json("Too many files to upload.");
    }
    return res.status(400).json(`Error when trying upload many files: ${error}`);
  }
};
exports.propic =  function(req, res){
  const options = {
    root: path.join(__dirname, '../../uploads/img'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  const fileName = req.params.image;
  res.sendFile(fileName, options, (err) => {
    if (err) {
      // next(err);
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
};
exports.e_login= async (req, res, next) => {
    const { email, password } = req.body;
    if (email === null || email === undefined
      || password === null || password === undefined
    ) {
      console.log('Bad request');
      return res.status(404).json({
        message: 'Bad request',
      });
    }
    Employee.findOne({ email }).exec((err, doc) => {
      if (err) {
        console.log(err);
        console.log('Internal server request');
        return res.status(500).json({ error: err });
      }

      if (doc === null) {
        console.log('not registered request');
        return res.status(404).json({ message: 'Email or password is incorrect' });
      }
      // const {password} = req.body;
      req.user = doc;
      next();
    });
  }
  exports.e_sign_token = async (req, res) => {
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
          name: req.user.name,
          surname: req.user.surname,
          address: req.user.address,
          phone: req.user.phone,
          designation: req.user.designation,
          active: req.user.active,
          days: req.user.days,
          profile_pic: req.user.profile_pic
        },
      });
    });
  }
  exports.e_compare= async (req, res, next) => {
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
  }
  exports.e_sign_up = async (req, res) => {
    const {
      email, contact, name, surname, address, designation, password, user_id
    } = req.body;
    if (email === null || email === undefined
      || password === null || password === undefined
    ) {
      console.log('Required Fields are null');
      return res.status(404).json({
        message: 'Required Fiels are null',
      });
    }
    Employee.find({ email })
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
          const newuser = new Employee({
            // _id: new mongoose.Types.ObjectId(),
            email,
            name,
            surname,
            addressOne: address,
            phone: contact,
            user_id,
            designation,
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
                    name: result.name,
                    surnname: result.surname,
                    address: result.address,
                    phone: result.phone,
                    profile_pic: result.profile_pic
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
  }