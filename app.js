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
  const renderWeek = week => {
    if (week.every(day => typeof day === "string")) {
      week.forEach(item => {
        result += `<th class="cell day-names">${item}</th>`;
      });
    } else {
      week.forEach(item => {
        // check if there is a date in a cell
        if (item) {
          // if yes, set atrribute with the date
          result += `<td class="cell date" data-current-date="${presentMonth + 1}.${counter++}.${presentYear}">${item}</td>`;
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
  // delete tasks from modal when modal is closed
  if (modal.classList.contains("hidden") && tasksDisplay.firstElementChild) {
    tasksDisplay.firstElementChild.remove();
  }
}
// make array for storing local storage values
let tasks = [];

function addTask() {
  try {
    if (taskField.value.length < 5) {
      alert("Please enter more than 5 characters.");
      return;
    }
    // add task to a local storage
      const keyDate = cellDate;

      if (!localStorage.getItem(keyDate)) {
        tasks = [];
      }

      if (localStorage.getItem(keyDate) === cellDate) {
        JSON.parse(localStorage.getItem(keyDate).push(taskField.value));
      }

      tasks.push(taskField.value);
      localStorage.setItem(keyDate, JSON.stringify(tasks));

    // update tasks DOM
    tasksDisplay.innerHTML = `<ul class="tasks-list" data-current-date="${cellDate}"></ul>`;
    cellDOM.innerHTML = `<div class="cell-tasks" data-current-date="${cellDate}"></div>`;

    for (let key in localStorage) {
      if (key === cellDate) {
        JSON.parse(localStorage.getItem(key)).forEach(task => {
          tasksDisplay.firstElementChild.innerHTML += `<li>${task}<i class="fa-solid fa-square-xmark modal-delete-btn" style="color: #e00000"></i></li>`;
          cellDOM.firstElementChild.innerHTML += `<p class="cell-single-task">${task}<i class="fa-solid fa-square-xmark cell-delete-btn" style="color: #e00000"></i></p>`;
        });
      }
    }
  } catch (err) {
    alert("Error has occured! Cannot update tasks.");
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

nextBtn.addEventListener("click", e => {
  if (e) {
    presentMonth++;
    if (presentMonth > 11) {
      presentYear++;
      presentMonth = 0;
    }
  }

  renderMonth(getMonth(presentYear, presentMonth));
});

prevBtn.addEventListener("click", e => {
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
month.addEventListener("click", e => {
  // assign data attribute when we click on a cell
  cellDOM = e.target.closest("td");
  cellDate = cellDOM.dataset.currentDate;

  // setAttribute to a task display to add specific tasks to a certain date
  tasksDisplay.setAttribute("data-current-date", cellDate);

  tasks = [];

  if (!cellDOM) {
    return;
  }

  if (cellDOM.innerText) {
    showModal();
    // iterate over keys in local storage
    for (let key in localStorage) {
      // if key matches modal display attribute add tasks from local storage
      if (key === tasksDisplay.dataset.currentDate) {
        tasksDisplay.innerHTML = `<ul class="tasks-list" data-current-date="${key}"></ul>`;
        tasks = JSON.parse(localStorage.getItem(key));
        tasks.forEach(task => {
          tasksDisplay.firstElementChild.innerHTML += `<li>${task}<i class="fa-solid fa-square-xmark modal-delete-btn" style="color: #e00000"></i></li>`;
        });
      }
    }
  }
});

// close modal
overlay.addEventListener("click", showModal);
closeBtn.addEventListener("click", showModal);

// add / delete task

addBtn.addEventListener("click", () => {
  addTask();
});


tasksDisplay.addEventListener("click", e => {
  deleteTask(e);
});
