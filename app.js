// global variables

const pageContent = document.querySelector(".page-content");
let DOMcontent;

const routes = {
  home() {
    location.reload()
  },
  about() {
    pageContent.innerHTML = `
    <div class="container">
        <div class="flex-item about">
          <h2 class="about-title">About me</h2>
          <p class="about-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem maiores vero autem quibusdam ratione perspiciatis nulla! Sint corporis reiciendis iure nam. Ut nesciunt totam, distinctio omnis illo veritatis, suscipit voluptas esse voluptatibus natus, sed facilis aperiam! Aliquid ipsum accusantium vel assumenda voluptatibus deserunt iusto est magni ut autem doloremque tenetur magnam ex, velit modi neque quam minima! Dicta a quas at id quod iure repudiandae mollitia cupiditate quis! Vitae quisquam iure voluptas eligendi corrupti minus reiciendis hic quasi earum molestias at dolor inventore placeat, laboriosam recusandae suscipit assumenda, facere repellat tenetur corporis odit? Quo incidunt ratione excepturi maxime officia itaque aut molestias fuga mollitia expedita, nobis nemo libero labore iure neque quibusdam, atque, sequi consequatur sed nostrum odit saepe ab veritatis? Iusto impedit ducimus consequatur cupiditate recusandae harum numquam sint.
          </p>
        </div>
        <div class="flex-item picture"><img src="/img/Me.jpg" alt="Dev's picture" class="img"></div>
    </div>
    `;
  },
  contacts() {
    pageContent.innerHTML = `
    <div class="form-container">
        <div class="form-text-container">
            <div class="form-text">
                <h1 class="form-text-title">Contact our support team</h1>
                <p class="form-text-paragraph">Fill out your information and we will reach out to you.</p>
            </div>
        </div>
        <form class="form">
            <div class="input-container">
                <label for="name"><div class="input-name">First name</div><input type="text" name="name" class="single-input"></label>
                <label for="surname"><div class="input-name">Last name</div><input type="text" name="surname" class="single-input"></label>
                <label for="email"><div class="input-name">Email</div><input type="text" name="email" class="single-input"></label>
                <label for="phone"><div class="input-name">Phone number</div><input type="text" name="phone" class="single-input"></label>
                <label for="message"><div class="input-name">What would you like to discuss?</div> <textarea name="message" id="textarea" class="single-input" cols="30" rows="10"></textarea></label>
            </div>
            <button type="submit" class="form-btn">Submit</button>
        </form>
    </div>
    `;
  },
};

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

// select button
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
// select all calendar days
let cells;

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
          result += `<td class="cell date" data-current-date="${presentMonth + 1}.${counter++}.${presentYear}">${item}<div></div></td>`;
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
    taskField.value = "";
    localStorage.setItem(keyDate, JSON.stringify(tasks));

    cellDOM.lastElementChild.innerHTML = `<ul class="cell-tasks"></ul>`;
    tasksDisplay.innerHTML = `<ul class="tasks-list"></ul>`;

    // set counter for assgining id to each task
    let id = 0;

    for (let key in localStorage) {
      if (key === cellDate) {
        JSON.parse(localStorage.getItem(key)).forEach(task => {
          tasksDisplay.firstElementChild.innerHTML += `<li data-id="${id}">${task}<i class="fa-solid fa-square-xmark modal-delete-btn" style="color: #e00000"></i></li>`;
          cellDOM.lastElementChild.firstElementChild.innerHTML += `<li class="cell-single-task" data-id="${id}">${task}<i class="fa-solid fa-square-xmark cell-delete-btn" style="color: #e00000"></i></li>`;
          id++;
        });
      }
    }
  } catch (err) {
    alert("Error has occured! Cannot update tasks.");
  }
}

function deleteTask(event) {
  let taskElem = event.target.parentElement;
  let keys = Object.keys(localStorage);
  let modalAtr = tasksDisplay.dataset.currentDate;
  let id = 0;

  if (taskElem) {
    const storageTasks = JSON.parse(localStorage.getItem(modalAtr));

    storageTasks.forEach((task, i) => {
      if (taskElem.dataset.id == i) {
        storageTasks.splice(i, 1);
      }
    });

    for (let key of keys) {
      if (key === modalAtr) {
        localStorage.setItem(key, JSON.stringify(storageTasks));
      }
    }
    if (tasksDisplay.firstElementChild) {
      tasksDisplay.firstElementChild.innerHTML = "";
      JSON.parse(localStorage.getItem(modalAtr)).forEach(task => {
        tasksDisplay.firstElementChild.innerHTML += `<li data-id="${id}">${task}
          <i class="fa-solid fa-square-xmark modal-delete-btn" style="color: #e00000" aria-hidden="true"></i></li>`;
        id++;
      });
    }
    cellDOM.firstElementChild.innerHTML = "";
    JSON.parse(localStorage.getItem(cellDate)).forEach(task => {
      cellDOM.firstElementChild.innerHTML += `<li class="cell-single-task" data-id="${id}">${task}
        <i class="fa-solid fa-square-xmark cell-delete-btn" style="color: #e00000" aria-hidden="true"></i></li>`;
      id++;
    });
  }

  tasks = JSON.parse(localStorage.getItem(modalAtr));
}

function updateDOM() {
  let keys = Object.keys(localStorage);
  // set counter for each task's id
  let id = 0;
  for (let day of cells) {
    let dateAtr = day.dataset.currentDate;
    for (let key of keys) {
      if (key === dateAtr) {
        day.lastElementChild.innerHTML = `<ul class="cell-tasks"></ul>`;
        JSON.parse(localStorage.getItem(key)).forEach(task => {
          day.lastElementChild.firstElementChild.innerHTML += `
        <li class="cell-single-task" data-id="${id}">${task}
        <i class="fa-solid fa-square-xmark cell-delete-btn" style="color: #e00000" aria-hidden="true"></i></li>
        `;
          id++;
        });
        // reset task to 0 when we switch cell
        id = 0;
      }
    }
  }
}

// event listeners

// when document loads, execute renderMonth
document.addEventListener("DOMContentLoaded", () => {
  renderMonth(getMonth(presentYear, presentMonth));
  // select cells with a date and reassign it to global variable
  cells = document.querySelectorAll(".date");
  updateDOM();
});

// change month and year when buttons are clicked

nextBtn.addEventListener("click", () => {
  presentMonth++;
  if (presentMonth > 11) {
    presentYear++;
    presentMonth = 0;
  }
  renderMonth(getMonth(presentYear, presentMonth));
  cells = document.querySelectorAll(".date");
  updateDOM();
});

prevBtn.addEventListener("click", () => {
  presentMonth--;
  if (presentMonth < 0) {
    presentYear--;
    presentMonth = 11;
  }
  renderMonth(getMonth(presentYear, presentMonth));
  cells = document.querySelectorAll(".date");
  updateDOM();
});

// open modal
month.addEventListener("click", e => {
  // assign data attribute when we click on a cell
  cellDOM = e.target.closest("td");
  if (cellDOM) {
    cellDate = cellDOM.dataset.currentDate;
  }

  // tasks' id
  let id = 0;

  // setAttribute to a task display to add specific tasks to a certain date
  tasksDisplay.setAttribute("data-current-date", cellDate);

  tasks = [];

  if (!cellDOM) {
    return;
  }

  if (cellDOM.innerText && !e.target.closest("i")) {
    showModal();
    // iterate over keys in local storage
    for (let key in localStorage) {
      // if key matches modal display attribute add tasks from local storage
      if (key === tasksDisplay.dataset.currentDate) {
        tasksDisplay.innerHTML = `<ul class="tasks-list"></ul>`;
        tasks = JSON.parse(localStorage.getItem(key));
        tasks.forEach(task => {
          tasksDisplay.firstElementChild.innerHTML += `<li data-id="${id}">${task}<i class="fa-solid fa-square-xmark modal-delete-btn" style="color: #e00000"></i></li>`;
          id++;
        });
      }
    }
  }

  if (e.target.closest("i")) {
    deleteTask(e);
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

// change page content depending on the hash
window.addEventListener("hashchange", () => {
  console.log(window.location.hash);
  switch (window.location.hash) {
    case "#home":
      routes.home()
      break;
    case "#about":
      routes.about()
      document.title = "Calendar | About";
      break;
      case "#contacts":
        routes.contacts()
        document.title = "Calendar | Contacts";
      break;
  }
});
