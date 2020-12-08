var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const {difference} = require('../service/dateFormatter')
var LeaveRequestsSchema =  Schema({
    emp_id: {
      type: Schema.Types.ObjectId,
       required: true,
       ref: 'Employee'
    },
    type: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    leaveDays: {
        type: Number,
        default: function () {
            if(this.start && this.end)
            return difference(this.start, this.end)
            return 0
        }
    },
    title: {
        type: String,
        default: ""
    },
    body: {
        type: String,
        default: ""
    },
    datetime: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
        default: 'Pending'
    },
    active:{
        type: Number,
        default: 0,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    documents: [
        {type: Schema.Types.ObjectId, ref: 'Documents'}
    ]
});

// LeaveRequestsSchema.pre('save', (next) =>{
//    this.leaveDays = difference(this.start, this.end)
//     next()
// });
const LeaveRequests = mongoose.model('LeaveRequests', LeaveRequestsSchema);
module.exports = LeaveRequests;