var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const DepartmentsSchema = new Schema({
    name: {
       type: String,
       required: true
    },
    short_name: {
      type: String, 
      required: true
    },
    code: {
        type: String,
        required: true
    },
 
    date_created: {
        type: Date,
        default: Date.now,
    },
});

var Department = mongoose.model('Department', DepartmentsSchema);
module.exports = Department;