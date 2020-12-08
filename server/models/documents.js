var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let DocumentsSchema =  Schema({
    emp_id: {
      type: Schema.Types.ObjectId,
       required: true,
       ref: 'Employee'
    },
    type: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    pathname: {
        type: String,
        required: true
    },
    leave_id: {
        type: Schema.Types.ObjectId,
       required: true,
       ref: 'LeaveRequests'
    },
    datetime: {
        type: Date,
        default: Date.now,
    },
});

const Documents = mongoose.model('Documents', DocumentsSchema);
module.exports = Documents;