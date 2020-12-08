const ctrl = require('./controller');
const { verify, v_verify } = require('../service/handleTokens');

module.exports = function (app) {
  app.route('/login')
    .post(ctrl.e_login, ctrl.e_compare, ctrl.e_sign_token);

  app.route('/signup')
    .post(ctrl.e_sign_up);

  app.route('/leave/apply')
    .post( ctrl.apply);
 
  app.route('/leave/cancel')
    .post( ctrl.cancel);

  app.route('/leave/approve')
    .post(ctrl.approve);
 
  app.route('/leave/reject')
    .post(ctrl.reject);

  app.route('/upload/document')
  .post(ctrl.uploadDoc, ctrl.save_doc);

  app.route('/upload/img')
  .post(ctrl.uploadPic, ctrl.update_propic);

  app.route('/leave')
    .get(ctrl.leave);

  app.route('/leave/:emp_id')
    .get(ctrl.emp_leave);

  app.route('/employees')
  .get( ctrl.employees);

  app.route('/img/:image')
  .get( ctrl.propic);

  app.route('/document/:document')
  .get( ctrl.get_doc);
  // for this end point we will only be accepting a post request
  app.route('/a/login')
    .post(ctrl.login, ctrl.compare, ctrl.sign_token);

  // only post request with id accepted
  // app.route('/place/signup/')
  //   .post(ctrl.sign_up);

  // app.route('/place/clockin/')
  //   .post(verify, ctrl.clockin);

  // app.route('/place/visitors/')
  //   .get(verify, ctrl.usercount);
  // app.route('/place/search/:contact')
  //   .get(ctrl.search);
  // app.route('*').get((req,res)=>{
  //   res.status(404).send("Plesea use the documentation Correctly. Double check the route as well as the http method you used for this request\n"+ new Date().toLocaleString())
  // })
};
