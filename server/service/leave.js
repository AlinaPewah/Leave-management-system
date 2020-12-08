const LeaveRequests = require('../models/leaverequests');
const Employee = require('../models/employee');
const { difference } = require('../service/dateFormatter');
const _ = require('lodash')

// request handler function that returns all leave request 
// in the database
exports.leave = async (req, res) => {
    const q =  LeaveRequests.find({})
      const docs = await q.populate('emp_id', ['surname', 'name', 'days', 'profile_pic', 'active', 'designation']).populate('documents').exec()
    
        if(!docs) {
            console.log(err);
           return res.status(500).json({})
        }
        res.status(200).json(_.orderBy(docs, 'datetime', 'desc'));
  
}

exports.addLeave = (req, res) => {
    
}
exports.emp_leave = (req, res) =>{
    const {emp_id} = req.params;
    if(!emp_id)
    return res.status(404).json("Null emp_id submitted")
    LeaveRequests.find({emp_id}).populate('emp_id', ['name','surname', 'days']).exec((err, docs) => {
        if(err) {
            console.log(err);
            return res.status(500).json({})
        }
        res.status(200).json(docs);
    });
}
exports.reject = (req, res) => {
    const {_id} = req.body;

    LeaveRequests
    .findByIdAndUpdate(
        _id,
        {status: 'Rejected'}, 
        (err,doc)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err)
            }
            res.status(201).json({'success': 'success'})
    })
}
exports.approve = async (req, res) => {
    const {_id, emp_id} = req.body;

//    let query = 

    let employee = await Employee.findById({_id:emp_id._id}).exec().catch(err=>{
        console.log(err);
        res.status(500).json(err)
    })
  
    if(!employee) return;

    let approved = await LeaveRequests.findByIdAndUpdate(
        {_id, status: 'Pending'},{status: 'Approved'} ).catch(err => {
        console.log(err);
        res.status(500).json("Unable to approve")
    })

    if(!approved) return;

    let days = difference(approved.start, approved.end)

    employee.days = employee.days - days;

    let updated = await employee.save().catch(err=> {console.log(err); res.status(500).json(err) })

    if(!updated) return;
    res.status(200).json("Approved and updated")

}
exports.cancel = (req, res) => {
    let {_id, emp_id} = req.body;
    emp_id = emp_id._id
    if(!_id || !emp_id){
        console.log("Required values missing");
        return res.status(404).json("Required values missing")
    }

    LeaveRequests
    .findOneAndUpdate(
        {_id, emp_id, status: 'Pending'},
        {status: 'Cancelled'}, 
        (err,doc)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err)
            }
            res.status(201).json({'success': 'success'})
    })
}

exports.apply = (req, res) => {
    const {emp_id, type, start, end, priority} = req.body;
    if(!emp_id || !type || !start || !end){
        console.log("null values");
        return res.status(404).json("Required fields absent")
    }
    LeaveRequests
    .findOne(
        { emp_id, type, status: 'Pending' }
        ).exec( 
       async (err,doc)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err)
            }
            if(doc){
                console.log('Have pending leave');
                return res.status(404).json('Have pending leave')
            }
            const new_l = new LeaveRequests({
               emp_id, type, start, end , priority
            })
            const result = await new_l.save().catch(err => {console.log(err); return res.status(500).json(err)})
            
            if(!result) return;

            res.status(201).json(result)
    })
}

// LeaveRequests.updateMany({}, {status: 'Pending'},{ multi: true, upsert: true }, (err,docs)=>{})