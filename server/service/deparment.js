const Departments = require('../models/leaverequests');

exports.getDepartments = (req, res) => {
    res.status(200).json([
        {name: 'Information Technology', shotr_name: 'IT', code: 'IT100'}
        {name: 'Human resource', shotr_name: 'HR', code: 'HR200'}
        {name: 'Sales', shotr_name: 'SL', code: 'SL300'}
        {name: 'Software Engineering', shotr_name: 'SE', code: 'SE400'}
    ])
}

exports.addDepartment = (req, res) => {
    res.status(201).json("Deparment saved")
}