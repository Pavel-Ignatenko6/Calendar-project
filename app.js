// Task : to come up with a fucntion that returns a nested array

// getDay(): возвращает день недели (отсчет начинается с 0 - воскресенье, и последний день - 6 - суббота)
////////////////////////////////////////////////

const container = document.querySelector(".month-container");

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
      // add week arrays to the result
      result.push(week);
    }
  }
  return result;
}

// add DOM to the container
function renderMonth(arr) {
  // add beginning of the table
  let result = '<table class="month">';

  const renderWeek = (week) => {
    if (week.some((day) => typeof day === "number")) {
      result += "<tr>";
      week.forEach((item) => {
        result += `<td>${item}<td>`;
      });
      result += "</tr>";
    }
    if (week.some((day) => typeof day === "string" && day.length > 0)) {
      result += "<tr>";
      week.forEach((item) => {
        result += `<th>${item}<th>`;
      });
      result += "</tr>";
    }
  };
  // arr[0] - add week days
  renderWeek(arr[0]);

  // add the rest of the weeks
  renderWeek(arr[1]);
  renderWeek(arr[2]);
  renderWeek(arr[3]);
  renderWeek(arr[4]);
  renderWeek(arr[5]);
  renderWeek(arr[6]);

  // add the end of the table
  result += "</table>";

  container.innerHTML = result;
}

addEventListener("DOMContentLoaded", () => {
  renderMonth(getMonth(2024, 3))
});
