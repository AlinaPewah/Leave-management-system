var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    addressOne: {
        type: String
    },
    addressTwo: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: { 
        type: String, 
        required: true 
    },
    phone: {
        type: String
    },
    phoneType: {
        type: String
    },
    designation: {
        type: String,
        enum: [
            'Labourer',
            'Senior Labourer',
            'Senior Workhand',
            'Forest Ranger',
            'Technician',
            'Senior Technician',
            'Chief Technicia',
            'Principal',
            'Forester',
            'Senior Forester',
            'Chief Forester',
            'Deputy Director',
            'Director',
            'Deputy Minister',
            'Minister',
          ],
          default: 'Labourer'
    },
    team: {
        type: String
    },
    days: {
        type: Number,
        default: 50
    },
    user_id: {
        type: String
    },
    doj: {
        type: Date,
        default: "",
    },
    profile_pic: {
        type: String,
        default: 'default.jpg'
    },
    active: {
        type: Number,
        default: 1
    }
});

var Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;