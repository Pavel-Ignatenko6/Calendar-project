// Task : to come up with a fucntion that returns a nested array

// getDay(): возвращает день недели (отсчет начинается с 0 - воскресенье, и последний день - 6 - суббота)

// Example :
//  [
// ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// ['', '', '', 1, 2, 3, 4],
// [5, 6, 7, 8, 9, 10, 11],
// [12, 13, 14, 15, 16, 17, 18],
// [19, 20, 21, 22, 23, 24, 25],
// [26, 27, 28, 29, '', '', '']
// ]


function getMonth(year, month) {
  // variables
  let result = [];
  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let firstWeek = [];

  //  get dates from Date object
  let date = new Date(year, month - 1);
  const currentMonth = date.getMonth();
  const weekDay = date.getDay();

  // add days of the week to the result arr
  result.push(dayNames);
  // add firstWeek of the week to the result arr
  result.push(firstWeek);

  // fill in firstWeek
  let count = 0;

  while (count < 7) {
    if (count < weekDay) {
      // add "" if count is less than 1st day's day of the week
      firstWeek.push("");
    } else {
      // if more, add day and increase number
      firstWeek.push(date.getDate());
      date.setDate(date.getDate() + 1); // изменяет день до 3-го числа
    }
    count++;
  }
  console.log('date ' + date.getDate());

  // fill the array with the rest of the weeks v

  // check if a day belongs to the current month
  while (currentMonth === date.getMonth()) {
    let days = 0; // counter

    // when there are 7 days create a week arr
    if (days % 7 === 0) {
      const week = [];
      // set days counter to 0
      days = 0;

      // inner loop: add days to the week arr
      while (days < 7) {
        // if day belongs to the current month, add a day to a week arr
        if (currentMonth === date.getMonth()) {
          week.push(date.getDate());
          // increase a day by one
          date.setDate(date.getDate() + 1);
        } else {
          // if a day doesn't belong to the current month, add "" to week arr
          week.push("");
        }
        days++;
      }
      console.log("date " + date.getDate());
      // add week arrays to the result
      result.push(week);
    }
  }
  return result;
}

console.log(getMonth(2024, 2));