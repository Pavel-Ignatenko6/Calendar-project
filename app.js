// Task : to come up with a fucntion that returns a nested array

// getDay(): возвращает день недели (отсчет начинается с 0 - воскресенье, и последний день - 6 - суббота)
////////////////////////////////////////////////

const container = document.querySelector(".month-container");
const now = new Date();

function getMonth(year, month) {
  // variables
  let result = [];
  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let firstWeek = [];

  //  get dates from Date object
  let date = new Date(year, month);
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

// buttons variables
const nextBtn = document.querySelector(".fa-angles-right");
const prevBtn = document.querySelector(".fa-angles-left");
// current date variables
let presentMonth = now.getMonth();
let presentYear = now.getFullYear();

const monthsArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthName = document.querySelector(".month-name");

// add DOM to the container
function renderMonth(arr) {
  // add a starting tag of the table
  let result = `<h2 class="month-name" data-month="${presentMonth}" data-year="${presentYear}">
  ${monthsArr[presentMonth]} ${presentYear}</h2>
  <table class="month">`;

  // iterate over each inner array and wrap elements in <td> and <th>
  const renderWeek = (week) => {
    if (week.every((day) => typeof day === "string")) {
      week.forEach((item) => {
        result += `<th class="cell day-names">${item}</th>`;
      });
    } else {
      week.forEach((item) => {
        result += `<td class="cell date">${item}</td>`;
      });
    }
  };

  // check if inner array exists, pass it in renderWeek function and wrap the result in <tr>
  for (let week of arr) {
    if (week) {
      result += `<tr class="row">`;
      renderWeek(week);
      result += `</tr>`;
    }
  }

  // add a closing tag of the table
  result += `</table>`;

  // pass the result into container's innerHTML
  container.innerHTML = result;
}

// modal variables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");
let month = document.querySelector(".month-container");

function showModal() {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}

// event listeners

// when document loads, execute renderMonth
addEventListener("DOMContentLoaded", () => {
  renderMonth(getMonth(presentYear, presentMonth));
});

// change month and year when buttons are clicked

nextBtn.addEventListener("click", (e) => {
  if (e) {
    presentMonth++;
    if (presentMonth > 11) {
      presentYear++;
      presentMonth = 0;
    }
  }

  renderMonth(getMonth(presentYear, presentMonth));
});

prevBtn.addEventListener("click", (e) => {
  if (e) {
    presentMonth--;
    if (presentMonth < 0) {
      presentYear--;
      presentMonth = 11;
    }
  }

  renderMonth(getMonth(presentYear, presentMonth));
});

// open modal
month.addEventListener("click", (e) => {
  if (!e.target.closest("td")) {
    return
  }

  if (e.target.innerText) {
    showModal();
  }
});

// close modal
overlay.addEventListener("click", () => showModal());
closeBtn.addEventListener("click", () => showModal());
