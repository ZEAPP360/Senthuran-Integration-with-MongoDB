// hidden nav show
let nav = document.getElementsByClassName("menu")[0];
let sideopen = document.getElementById("sidebaropen");
sideopen.onclick = () => {
  console.log(nav);
  // nav.style.left = "-10px"
  nav.classList.add("hidden_nav");
  let sideclose = document.getElementById("sidebarclose");
  sideclose.onclick = () => {
    // nav.style.left = "-10px"
    nav.classList.remove("hidden_nav");
  };
};

// theme change
let theme = document.getElementById("theme-change");

theme.addEventListener("click", (img) => {
  let navImg = document.querySelectorAll(".nav-bar img");
  for (i = 0; i < navImg.length; i++) {
    navImg[i].classList.toggle("invert");
  }
  if (img.target.alt === "light") {
    // this is dark theme
    img.target.src = "icons/moon.png";
    img.target.alt = "dark";
    document.documentElement.style.setProperty("--nav-color", "#1f2028");
    document.documentElement.style.setProperty("--body-color", "#161621");
    document.documentElement.style.setProperty("--side-nav", "#1f2028");
    document.documentElement.style.setProperty("--text-color", "white");
    document.documentElement.style.setProperty("--taskBg", "#2b2d3e");
    document.documentElement.style.setProperty("--addTask", "#2b2d3e");
    document.documentElement.style.setProperty("--main-color", "#161621");
    document.documentElement.style.setProperty("--primary-clr", "#2b2d3e");
    document.documentElement.style.setProperty("--cont-bg", "#1f2028");
  } else {
    // this is light theme
    img.target.src = "icons/sun.png";
    img.target.alt = "light";
    document.documentElement.style.setProperty("--nav-color", "#ffffff");
    document.documentElement.style.setProperty("--body-color", "#fdb44b");
    document.documentElement.style.setProperty("--side-nav", "#fdb44b");
    document.documentElement.style.setProperty("--text-color", "#000000");
    document.documentElement.style.setProperty("--taskBg", "white");
    document.documentElement.style.setProperty("--addTask", "#fdb44b");
    document.documentElement.style.setProperty("--main-color", "#fdb44b");
    document.documentElement.style.setProperty("--primary-clr", "#fdb44b");
    document.documentElement.style.setProperty("--cont-bg", "#15171e");
  }
});

const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
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

const eventsArr = [];
getEvents();
console.log(eventsArr);

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update events when a day is active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event" id=${event.event_id} onclick='deletevent(this)'>
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

//function to add event
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

//allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

//allow only time in eventtime from and to
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});


let deletevent =async (e)=>{

  console.log(e.id)
  
  // alert("ok")
  // let data = await e.target.children[0].children[0].value;
  // console.log(data)

      var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

 await fetch(`http://127.0.0.1:3000/todo/deletecalendar/${e.id}`, requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result)
    // const eventTitle = e.target.children[0].children[1].innerHTML;
    // eventsArr.forEach((event) => {
    //   if (
    //     event.day === activeDay &&
    //     event.month === month + 1 &&
    //     event.year === year
    //   ) {
    //     event.events.forEach((item, index) => {
    //       if (item.title === eventTitle) {
    //         event.events.splice(index, 1);
    //       }
    //     });
    //     //if no events left in a day then remove that day from eventsArr
    //     if (event.events.length === 0) {
    //       eventsArr.splice(eventsArr.indexOf(event), 1);
    //       //remove event class from day
    //       const activeDayEl = document.querySelector(".day.active");
    //       if (activeDayEl.classList.contains("event")) {
    //         activeDayEl.classList.remove("event");
    //       }
    //     }
    //   }
    // });
//     updateEvents(activeDay);
    // window.location.reload()
  }
    )
  .catch(error => console.log('error', error));
  
}




//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  //check correct time format 24 hour
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  //check if event is already added
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }
let date = document.getElementsByClassName("event-date")
let useruid = localStorage.getItem("User_Id")
console.log(date)
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
    date :date[0].innerText.toString(),
    user_id  : useruid
  };
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(newEvent);
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:3000/todo/addcalendar", requestOptions)
  .then(response => response.json())
  .then(result => {
    
    console.log(newEvent);
    newEvent["event_id"]= result.result._id

    
    console.log(result)
    console.log(activeDay);

    let eventAdded = false;
    if (eventsArr.length > 0) {
      eventsArr.forEach((item) => {
        if (
          item.day === activeDay &&
          item.month === month + 1 &&
          item.year === year
        ) {
          item.events.push(newEvent);
          eventAdded = true;
        }
      });
    }
  
    if (!eventAdded) {
      eventsArr.push({
        day: activeDay,
        month: month + 1,
        year: year,
        events: [newEvent],
      });
    }
  
    console.log(eventsArr);
    addEventWrapper.classList.remove("active");
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";
    updateEvents(activeDay);
    //select active day and add event class if not added
    const activeDayEl = document.querySelector(".day.active");
    if (!activeDayEl.classList.contains("event")) {
      activeDayEl.classList.add("event");
    }

  })
  .catch(error => console.log('error', error));

 
});

//function to delete event when clicked on event
eventsContainer.addEventListener("click", async(e) => {

    const eventTitle = e.target.children[0].children[1].innerHTML;
    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        event.events.forEach((item, index) => {
          if (item.title === eventTitle) {
            event.events.splice(index, 1);
          }
        });
        //if no events left in a day then remove that day from eventsArr
        if (event.events.length === 0) {
          eventsArr.splice(eventsArr.indexOf(event), 1);
          //remove event class from day
          const activeDayEl = document.querySelector(".day.active");
          if (activeDayEl.classList.contains("event")) {
            activeDayEl.classList.remove("event");
          }
        }
      }
    });
    updateEvents(activeDay);
    // window.location.reload()
  }
  
  
);

//function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

function getALlprom(){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let id =   localStorage.getItem("User_Id")
  
var raw = JSON.stringify({
  "user_id": id
}); 

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body:raw
  };
  
  fetch("http://127.0.0.1:3000/todo/getcalendar/", requestOptions)
    .then(response => response.json())
    .then(result =>{ 
      console.log(result.data.calendar)
      let events = "";
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const today = new Date();
const day = today.getDate();
const monthIndex = today.getMonth();
const year = today.getFullYear().toString().substr(-2);
const monthName = months[monthIndex];

const formattedDate = `${day} ${monthName} ${year}`;

console.log(formattedDate);
      result.data.calendar =  result.data.calendar.filter((v)=>v.Date==formattedDate)
      //     result.data.calendar.forEach((event) => {
      //       events += `<div class="event" >
      //           <div class="title">
      //           <input type='hidden' id='calederdata' value='${event._id}'/>
      //             <i class="fas fa-circle"></i>
      //             <h3 class="event-title">${event.title}</h3>
      //           </div>
      //           <div class="event-time">
      //             <span class="event-time">${event.time}</span>
      //           </div>
      //       </div>`;
      //     });
      // if (events === "") {
      //   events = `<div class="no-event">
      //           <h3>No Events</h3>
      //       </div>`;
      // }
      // eventsContainer.innerHTML = events;
      // saveEvents();
    })
    .catch(error => console.log('error', error));
  }

  
let logout = ()=>{
  localStorage.clear()
  window.location.replace("/login")
}

  getALlprom()



  