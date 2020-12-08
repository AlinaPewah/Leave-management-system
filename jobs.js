const cron = require('node-cron');
// const qp = require('queryable-promise');
const moment = require('moment');
const Employee = require('./server/models/employee');
const LeaveRequests = require('./server/models/leaverequests');

// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )

//schedule a cron job to run at 00:00 everyday
cron.schedule('00 00 * * *', async () => {
  console.log('Running Cron Job');

  // get leaves request that are starting today
  const starting = await get_starting_leave();

  // get leaves request that are ending today 
  const ending = await get_ending_leave();

  // loop through all request and call method activate
  // each time passing in the employee id
  starting.map((s) => activate_leave(s.emp_id));

  // loop through all request and call method deactivate
  // each time passing in the employee id
  ending.map((s) => deactivate_leave(s.emp_id));
});

// method to activate / set  employee status to 0 (on leave) given the id
function activate_leave(id) {

  // find the employee and set their status field to 0
  Employee.findByIdAndUpdate(id, {
    active: 0,
  }).exec();
}


// method to deactivate leave / set  employee status to 1 (active) given the id
function deactivate_leave(id) {

  // find the employee and set their status field to 1
  Employee.findByIdAndUpdate(id, {
    active: 1,
  }).exec();
}

// method returns Leave Request starting on the current day
async function get_starting_leave() {

  // run a query to find Leave Request with status of 'Approved'
  const cursor = LeaveRequests.find({ status: 'Approved' }).cursor();

  // initialise an empty array r
  const r = [];

  // loop through the returned leave request
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {

    // if the leave is starting today
    if (moment().isSame(doc.start, 'day')) {
      // push it into the  array r
      r.push(doc);
    }
  }
  // return the array r
  return r;
}

// method returns Leave Request which were approved & are ending on the current day
async function get_ending_leave() {

   // run a query to find Leave Request with status of 'Approved'
  const cursor = LeaveRequests.find({ status: 'Approved' }).cursor();

  // initialise an empty array e
  const e = [];

  // loop through the returned leave request
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    // if the leave is starting today
    if (moment().isSame(doc.end, 'day')) {
      // push it into the  array r
      e.push(doc);
    }
  }
  
  // return array e
  return e;
}

// for await (const doc of LeaveRequests.find()) {
//     console.log(doc); // Prints documents one at a time
//   }
