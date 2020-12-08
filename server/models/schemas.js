process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error.message);
});
// require mongoose
// define and export the page schecma
const option = { socketTimeoutMS: 30000, keepAlive: true, reconnectTries: 30000 };
const mongoose = require('mongoose');
// mongoose.set('bufferCommands', false);
mongoose.connect(process.env.MONGODB_URL,
  option).then(
  () => {
    console.log('Ready to Use...Connected successfully');
  },
  (err) => {
    console.log('Ze bluetooth device is unable to connect');
    console.log(err);
    throw err;
  },
);

//  has edited this file.....:
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  id: String,
  contact: {
    type: String,
    match: /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  address: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// const Schema = new mongoose.Schema({

//   description: {
//     type: String,
//     required: true,
//   },
//   erf: { type: String },
//   street: String,
//   location: { type: String },
//   price: {
//     type: String,
//     required: true,
//   },
//   closing: Date,
//   owner: String,
//   applicants: [
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//       },
//       date: {
//         type: Date,
//         default: Date.now,
//       },

//     },
//   ],

// });
const Schema = new mongoose.Schema({

  title: { type: String },
  description: {
    type: String,
    required: true,
   },
   erf: { type: String },
   street: String,
   location: { type: String },
  price: {
    type: String,
    required: true,
  },
  closing: Date,
  owner: String,
  applicants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },

    },
  ],

});

const adminSchema = new mongoose.Schema({
  email: {type: String,
      unique: true,
     required: true},
  password: {type: String,
  required: true},
});

const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);

// const Plot = mongoose.model('Plot', plotSchema);
// const House = mongoose.model('House', houseSchema);
module.exports = { User, Admin };
