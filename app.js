// Task : to come up with a fucntion that returns a nested array

// getDay(): возвращает день недели (отсчет начинается с 0 - воскресенье, и последний день - 6 - суббота)
////////////////////////////////////////////////

// global variables
const container = document.querySelector(".month-container");
const now = new Date();
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

// button variables
const nextBtn = document.querySelector(".fa-angles-right");
const prevBtn = document.querySelector(".fa-angles-left");
const closeBtn = document.querySelector(".close-btn");
const addBtn = document.querySelector(".modal-add-btn");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".modal-overlay");

// DOM variables
const month = document.querySelector(".month-container");
// make a variable to store data attribute in each cell
let cellDate;
let cellDOM;

// add / delete task variables
const taskField = document.querySelector(".modal-task-field");
const tasksDisplay = document.querySelector(".modal-tasks-display");

function getMonth(year, month) {
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

// add DOM to the container
function renderMonth(arr) {
  // create counter for days in the date attribute
  let counter = 1;
  // add a starting tag of the table
  let result = `<h2 class="month-name">
  ${monthsArr[presentMonth]} ${presentYear}</h2>
  <table class="month" data-month="${presentMonth + 1}" data-year="${presentYear}">`;

  // iterate over each inner array and wrap elements in <td> and <th>
  const renderWeek = (week) => {
    if (week.every((day) => typeof day === "string")) {
      week.forEach((item) => {
        result += `<th class="cell day-names">${item}</th>`;
      });
    } else {
      week.forEach((item) => {
        // check if there is a date in a cell
        if (item) {
          // if yes, set atrribute with the date
          result += `<td class="cell date" data-current-date="${
            presentMonth + 1
          }.${counter++}.${presentYear}">${item}</td>`;
        } else {
          // otherwise no attribute
          result += `<td class="cell">${item}</td>`;
        }
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

function showModal() {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}
// make array for storing local storage values
let tasks = [];
let parsedTasks;

function updateLocalStorage() {
  const keyDate = cellDate;
      localStorage.setItem(keyDate, JSON.stringify(tasks));
      parsedTasks = JSON.parse(localStorage.getItem(keyDate));
}

function updateTasks() {
  tasksDisplay.innerHTML = `<ul class="tasks-list"></ul>`;
  cellDOM.innerHTML = `<div class="cell-tasks"></div>`;
  parsedTasks.forEach((task) => {
    tasksDisplay.firstElementChild.innerHTML += `<li>${task}<i class="fa-solid fa-square-xmark modal-delete-btn" style="color: #e00000"></i></li>`;
    cellDOM.firstElementChild.innerHTML += `<p class="cell-single-task">${task}<i class="fa-solid fa-square-xmark cell-delete-btn" style="color: #e00000"></i></p>`;
  });
}

function addTask() {
  try {

    if (taskField.value.length > 5) {
      tasks.push(taskField.value);
      updateLocalStorage()
      updateTasks()
    } else {
      throw err
    }

    // for THE NEXT TIME ---> add task to a specific cell
  } catch (err) {
      alert("Please enter more than 5 characters");
    
  }
}

function deleteTask(event) {
  if (event.target.closest("i")) {
    event.target.parentElement.remove();
  }
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
  // assign data attribute when we click on a cell
  
  cellDOM = e.target.closest("td");
  cellDate = cellDOM.dataset.currentDate;

  console.log(cellDOM);
  console.log(cellDate);

  if (!e.target.closest("td")) {
    return;
  }

  if (e.target.innerText) {
    showModal();
  }
});

// close modal
overlay.addEventListener("click", showModal);
closeBtn.addEventListener("click", showModal);

// add / delete task

addBtn.addEventListener("click", () => {
  addTask();
});

// to Fix ???????
tasksDisplay.addEventListener("click", (e) => {
  deleteTask(e);
});
