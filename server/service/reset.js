const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require('cors')({
  origin: true,
});

module.exports.emailMessage = ((req, res) => {
  const {
    firstname, lastname, dateofbirth, summary, email,
  } = req.body;
  return cors(req, res, () => {
    try {
      const text = `<div>
      <h4>Reset password OTP</h4>
      <p>OTP</p>
      
    </div>`;
      const sesAccessKey = 'smartregister@unam.na';
      const sesSecretKey = '********';

      const transporter = nodemailer.createTransport(
        smtpTransport({
          host: 'mail.unam.na',
          port: 587,
          secure: false,
          auth: {
            user: sesAccessKey,
            pass: sesSecretKey,
          },
        }),
      );
      const mailOptions = {
        to: email,
        from: 'smartregister@unam.na',
        subject: `Password reset`,
        text,
        html: text,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error.message);
        }
        res.status(200).send({
          message: 'success',
        });
      });
    } catch (error) {
      res.status(500).send('error');
    }
  });
});
