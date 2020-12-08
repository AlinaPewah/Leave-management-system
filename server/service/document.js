const path = require('path')
const { uploadDocMiddleware}= require('../middleware/upload')
const LeaveRequests = require('../models/leaverequests');
const Documents = require('../models/documents');

exports.uploadDoc = async (req, res,next) => {
    try {
      await uploadDocMiddleware(req, res);
      
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

  exports.save_doc = async (req, res) => {

    const {leave_id, emp_id, name} =  req.body

    const {doc_file} = req;
    console.log(doc_file);
    let leave = await LeaveRequests.findById(leave_id)
    .catch(err => {console.log(err);res.status(500).json("Leave not found")})
    console.log(leave);
    if(!leave) return;

    let document = new Documents({emp_id, leave_id, name, pathname: doc_file })

    let saved_doc = await document.save().catch(err=> {console.log(err);res.status(500).json("Unable to save doc")})

    if(!saved_doc) return;

    leave.documents.push(saved_doc._id);

    let updated_leave = await leave.save().catch(err=>{console.log(err);res.status(500).json(err)})

    if(!updated_leave) return;

    res.status(200).json("Document saved!")

  }

exports.get_doc =  function(req, res){
    const options = {
      root: path.join(__dirname, '../../uploads/document'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
    },
};
  
    const fileName = req.params.document;
    res.sendFile(fileName, options, (err) => {
      if (err) {
        // next(err);
        console.log(err);
      } else {
        console.log('Sent:', fileName);
      }
    });
  };