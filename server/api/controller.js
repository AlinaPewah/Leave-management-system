const admin = require('../service/admin');
const user = require('../service/user');
const {e_login, e_compare, e_sign_token, e_sign_up, } =require('../service/employee')
const {employees, propic, update_propic, uploadPic} = require('../service/employee')
const {leave, emp_leave, apply, approve, reject, cancel} = require('../service/leave')
const {uploadDoc, save_doc, get_doc} = require('../service/document')
// const {signToken} = require('../service/handleTokens')
const controller = {
  ...admin,
  ...user,
  e_login,
  e_compare,
  e_sign_token,
  e_sign_up,
  employees,
  leave,
  emp_leave,
  apply,
  approve,
  reject,
  cancel,
  uploadDoc,
  save_doc,
  get_doc,
  propic,
  update_propic,
  uploadPic
};
 
module.exports = controller;
