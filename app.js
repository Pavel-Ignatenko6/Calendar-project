// Task : to come up with a fucntion that returns a nested array

// Example :
//  [
// ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// ['', '', '', 1, 2, 3, 4],
// [5, 6, 7, 8, 9, 10, 11],
// [12, 13, 14, 15, 16, 17, 18],
// [19, 20, 21, 22, 23, 24, 25],
// [26, 27, 28, 29, '', '', '']
// ]

//my code
function getMonth() {
    let result = []
    let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const date = new Date();
    const day = date.getDate();
    const weekDay = date.getDay();
    const month = date.getMonth()
  console.log(date);
  console.log(day);
  console.log(weekDay);
  console.log(month);

  return result;
}

console.log(getMonth());
