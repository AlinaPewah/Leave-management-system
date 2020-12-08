const formatter = {
  day: (dateString) => {
    const d = new Date(dateString);
    let f = '';
    switch (d.getDay()) {
      case 1:
        f = 'Monday';
        break;
      case 2:
        f = 'Tuesday';
        break;
      case 3:
        f = 'Wednesday';
        break;
      case 4:
        f = 'Thursday';
        break;
      case 5:
        f = 'Friday';
        break;
      case 6:
        f = 'Saturday';
        break;
      case 0:
        f = 'Sunday';
        break;
      default:
        f = 'Invalid date';
    }
    return f;
  },
  date: (dateString) => {
    const d = new Date(dateString);
    console.log(d.toString());
    return d.toDateString().substr(4);
  },
  time: (dateString) => {
    const d = new Date(dateString);
    const hour = d.getHours() === 0 ? '00' : `${d.getHours()}`;
    const mins = d.getMinutes() === 0 ? '00' : `${d.getMinutes()}`;
    return `${hour}:${mins}`;
  },
  difference: (date1, date2) =>{

    // To set two dates to two variables 
     date1 = new Date(date1); 
     date2 = new Date(date2); 
      
    // To calculate the time difference of two dates 
    const Difference_In_Time = date2.getTime() - date1.getTime(); 
      
    // To calculate the no. of days between two dates 
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
    
    return Difference_In_Days
  }
};
const c = formatter.difference('09-13-2020', '09-19-2020');
console.log(c, 'days');
module.exports = formatter;
