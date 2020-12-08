
const util = require("util");
const path = require("path");
const multer = require("multer");

var storage1 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../uploads/img`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg/jpg.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-lms-${file.originalname}`;
    req.pic_file = filename
    callback(null, filename);
  }
});

var storage2 = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join(`${__dirname}/../../uploads/document`));
    },
    filename: (req, file, callback) => {
      const match = ["application/pdf"];
  
      if (match.indexOf(file.mimetype) === -1) {
        var message = `${file.originalname} is invalid. Only accept pdf.`;
        return callback(message, null);
      }
  
      var filename = `${Date.now()}-lms-${file.originalname}`;
      req.doc_file =filename
      callback(null, filename);
    }
  });

  var uploadPic = multer({ storage: storage1 }).single("propic");
var uploadDoc = multer({ storage: storage2 }).single("document");

var uploadPicMiddleware = util.promisify(uploadPic);
var uploadDocMiddleware = util.promisify(uploadDoc);

module.exports = {uploadDocMiddleware, uploadPicMiddleware};