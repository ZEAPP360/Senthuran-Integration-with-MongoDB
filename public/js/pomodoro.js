// hidden nav show
let nav = document.getElementsByClassName("menu")[0];
let sideopen = document.getElementById("sidebaropen");
sideopen.onclick = () => {
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
  let allImg = document.getElementsByTagName("img");
  for (i = 0; i < allImg.length; i++) {
    allImg[i].classList.toggle("invert");
  }
  if (img.target.alt === "light") {
    img.target.src = "icons/moon.png";
    img.target.alt = "dark";
    document.documentElement.style.setProperty("--nav-color", "#1f2028");
    document.documentElement.style.setProperty("--body-color", "#1f2028");
    document.documentElement.style.setProperty("--side-nav", "#1f2028");
    document.documentElement.style.setProperty("--text-color", "white");
    document.documentElement.style.setProperty("--taskBg", "#2b2d3e");
    document.documentElement.style.setProperty("--addTask", "#2b2d3e");
    document.documentElement.style.setProperty("--main-color", "#161621");
    document.documentElement.style.setProperty("--timerBg", "#1f2028");
    document.documentElement.style.setProperty("--listBg", "#2b2d3e");
  } else {
    img.target.src = "icons/sun.png";
    img.target.alt = "light";
    document.documentElement.style.setProperty("--nav-color", "#ffffff");
    document.documentElement.style.setProperty("--body-color", "#fdb44b");
    document.documentElement.style.setProperty("--side-nav", "#fdb44b");
    document.documentElement.style.setProperty("--text-color", "#000000");
    document.documentElement.style.setProperty("--taskBg", "white");
    document.documentElement.style.setProperty("--addTask", "#fdb44b");
    document.documentElement.style.setProperty("--main-color", "#fdb44b");
    document.documentElement.style.setProperty("--timerBg", "#000000");
    document.documentElement.style.setProperty("--listBg", "#f2f2f2");
  }
});

// add todo code start
const inputField = document.querySelector(".input-field textarea"),
  todoLists = document.querySelector(".todoLists"),
  pendingNum = document.querySelector(".pending-num"),
  clearButton = document.querySelector(".clear-button");

function addTodo() {
  let inputVal = inputField.value.trim();
  if (inputVal.length > 0) {
    let liTag = ` <li class="list pending" onclick="handleStatus(this)"><span>
        <input  type="checkbox" /></span>
        
        ${inputVal}
        <span class="mx-2 right">
        <img src="icons/pencil.png" onclick="editTask(this)" width="20px" alt="">
        <img  class="mx-2" src="icons/delete.png" onclick="deleteTask(this)" width="20px" alt="">
        </span>
      </li>`;

    todoLists.insertAdjacentHTML("beforeend", liTag); //inserting li tag inside the todolist div
    inputField.value = ""; //removing value from input field

    allTasks();
  }
}

//we will call this function while adding, deleting and checking-unchecking the task
function allTasks() {
  let tasks = document.querySelectorAll(".pending");

  //if tasks' length is 0 then pending num text content will be no, if not then pending num value will be task's length
  pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;

  let allLists = document.querySelectorAll(".list");
  if (allLists.length > 0) {
    todoLists.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
    return;
  }
  todoLists.style.marginTop = "0px";
  clearButton.style.pointerEvents = "none";
}

// checking and unchecking the chekbox while we click on the task
function handleStatus(e) {
  const checkbox = e.querySelector("input"); //getting checkbox
  checkbox.checked = checkbox.checked ? false : true;
  e.classList.toggle("pending");
  e.classList.toggle("checkme");
  allTasks();
}

function deleteTask(e) {
  let ele = e.parentNode.parentNode;
  // console.log(ele)
  ele.remove();
  allTasks();
}
$(document).ready(function () {
  // todo listy code start
  //Getting all required elements
  const inputField = document.querySelector(".input-field textarea");

  //add task while we put value in text area and press enter
  inputField.addEventListener("keyup", (e) => {
    let inputVal = inputField.value.trim(); //trim fuction removes space of front and back of the inputed value

    //if enter button is clicked and inputed value length is greated than 0.
    if (e.key === "Enter" && inputVal.length > 0) {
      addTodo();
    }
  });
  // todo list code end

  // timer code start
  $(document).ready(function () {
    let minutes = 20;
    let seconds = 0;

    let timePomodoro = 20 * 60;

    let timeSB = 5 * 60;
    let timeLB = 15 * 60;

    let timeLeft = timePomodoro;
    let modeTime = timePomodoro;
    let running = false;
    let finishedCycle = false;

    let activeFont = "font-kumbh";
    let activeColor = "#fdb44b";

    let currentMode = "pomodoro";

    var soundFinished = new Audio("assets/finished.mp3");

    let currentWindowWidth = window.innerWidth;
    let timerCanvas = document.getElementById("timer-canvas").getContext("2d");

    $(document).ready(() => {
      if (window.innerWidth > 630) {
        timerCanvas.canvas.height = 339;
        timerCanvas.canvas.width = 339;
      } else {
        timerCanvas.canvas.height = 248;
        timerCanvas.canvas.width = 248;
      }
      drawArc();
    });
    //Fallback event listener just in case the user resizes the window below a breakpoint.
    //This is important because the canvas drawing functionality is reliant on the window's width
    $(window).on("resize", function () {
      var win = $(this);
      currentWindowWidth = win.width();
      if (currentWindowWidth > 630) {
        timerCanvas.canvas.height = 339;
        timerCanvas.canvas.width = 339;
      } else {
        timerCanvas.canvas.height = 248;
        timerCanvas.canvas.width = 248;
      }

      drawArc();
    });

    let currentSettings = {
      tPomodoro: 20,
      tSB: 5,
      tLB: 15,
      fontType: "font-kumbh",
      colorType: activeColor,
    };

    let settingsMarshall = {
      tPomodoro: 20,
      tSB: 5,
      tLB: 15,
      fontType: "font-kumbh",
      colorType: activeColor,
    };

    //Section for handling the canvas timer

    function drawArc() {
      timerCanvas.strokeStyle = currentSettings.colorType;
      timerCanvas.lineWidth = 10;
      timerCanvas.lineCap = "round";
      if (currentWindowWidth > 630) {
        timerCanvas.clearRect(0, 0, 340, 340);
        timerCanvas.beginPath();
        timerCanvas.arc(
          170,
          170,
          160,
          Math.PI * 1.5,
          Math.PI * (-0.5 + 1.999999 * (timeLeft / modeTime)),
          false
        );
        console.log(timeLeft, modeTime);
        timerCanvas.stroke();
      } else {
        timerCanvas.lineCap = "round";
        timerCanvas.clearRect(0, 0, 248, 248);
        timerCanvas.beginPath();
        timerCanvas.arc(
          124,
          124,
          114,
          Math.PI * 1.5,
          Math.PI * (-0.5 + 1.999999 * (timeLeft / modeTime)),
          false
        );
        timerCanvas.stroke();
      }
    }

    drawArc();

    function changeMode(mode) {
      clearInterval(pomodoro);
      running = false;
      finishedCycle = false;
      switch (mode) {
        case "pomodoro":
          timeLeft = timePomodoro;
          modeTime = timePomodoro;
          currentMode = "pomodoro";
          break;
        case "shortbreak":
          timeLeft = timeSB;
          modeTime = timeSB;
          currentMode = "shortbreak";
          break;
        case "longbreak":
          timeLeft = timeLB;
          modeTime = timeLB;
          currentMode = "longbreak";
          break;
        default:
          timeLeft = timePomodoro;
          modeTime = timePomodoro;
          currentMode = "pomodoro";
          console.log("ERROR: Cannot set time of mode named " + mode);
      }

      setTime(timeLeft);
      $(".timer-control").text("START");
    }

    //I would like to sincerely apologize for the following spaghetti code

    $("#mode-pomodoro").click(function () {
      if (!$(this).is("disabled")) {
        changeMode("pomodoro");
        $(this).addClass("mode-active");
        $(this).prop("disabled", true);
        $(this).css("background-color", currentSettings.colorType);
        $("#mode-longbreak").prop("disabled", false);
        $("#mode-shortbreak").prop("disabled", false);
        $("#mode-longbreak").removeClass("mode-active");
        $("#mode-shortbreak").removeClass("mode-active");
        $("#mode-longbreak").css("background-color", "transparent");
        $("#mode-shortbreak").css("background-color", "transparent");
      }
    });

    $("#mode-longbreak").click(function () {
      if (!$(this).is("disabled")) {
        changeMode("longbreak");
        $(this).addClass("mode-active");
        $("#mode-pomodoro").prop("disabled", false);
        $(this).prop("disabled", true);
        $(this).css("background-color", currentSettings.colorType);
        $("#mode-shortbreak").prop("disabled", false);
        $("#mode-pomodoro").removeClass("mode-active");
        $("#mode-shortbreak").removeClass("mode-active");
        $("#mode-pomodoro").css("background-color", "transparent");
        $("#mode-shortbreak").css("background-color", "transparent");
      }
    });

    $("#mode-shortbreak").click(function () {
      if (!$(this).is("disabled")) {
        changeMode("shortbreak");
        $(this).addClass("mode-active");
        $("#mode-pomodoro").prop("disabled", false);
        $("#mode-longbreak").prop("disabled", false);
        $(this).prop("disabled", true);
        $(this).css("background-color", currentSettings.colorType);
        $("#mode-longbreak").removeClass("mode-active");
        $("#mode-pomodoro").removeClass("mode-active");
        $("#mode-longbreak").css("background-color", "transparent");
        $("#mode-pomodoro").css("background-color", "transparent");
      }
    });
    function setTime(time) {
      minutes = Math.floor(time / 60);
      seconds = time % 60;

      minutes >= 10
        ? $(".timer-minutes").text(minutes)
        : $(".timer-minutes").text("0" + minutes);
      seconds >= 10
        ? $(".timer-seconds").text(seconds)
        : $(".timer-seconds").text("0" + seconds);
      drawArc();
    }

    setTime(timeLeft);

    let pomodoro;

    $(".timer-control").click(function () {
      if (!finishedCycle) {
        if (!running) {
          running = true;
          $(".timer-control").text("PAUSE");
          pomodoro = setInterval(function () {
            timeLeft--;
            // console.log(timeLeft,timePomodoro)
            setTime(timeLeft);

            if (timeLeft <= 0) {
              finishedCycle = true;
              running = false;
              soundFinished.play();
              $(".timer-control").text("RESTART");
              clearInterval(pomodoro);
            }
          }, 1000);
        } else {
          running = false;
          $(".timer-control").text("RESUME");
          clearInterval(pomodoro);
        }
      } else {
        timeLeft = modeTime;
        setTime(timeLeft);
        finishedCycle = false;
        $(".timer-control").text("START");
      }
    });

    //Handle hovering of SVGs because they do *not* like to behave
    $(".modal-svg > img").mouseenter(function () {
      let vsrc = $(this).attr("src");
      switch (vsrc) {
        case "assets/icon-close.svg":
          $(this).attr("src", "assets/icon-close-hover.svg");
          break;
        case "assets/icon-arrow-up.svg":
          $(this).attr("src", "assets/icon-arrow-up-hover.svg");
          break;
        case "assets/icon-arrow-down.svg":
          $(this).attr("src", "assets/icon-arrow-down-hover.svg");
          break;
        default:
          break;
      }
    });

    $(".modal-svg > img").mouseleave(function () {
      let vsrc = $(this).attr("src");
      switch (vsrc) {
        case "assets/icon-close-hover.svg":
          $(this).attr("src", "assets/icon-close.svg");
          break;
        case "assets/icon-arrow-up-hover.svg":
          $(this).attr("src", "assets/icon-arrow-up.svg");
          break;
        case "assets/icon-arrow-down-hover.svg":
          $(this).attr("src", "assets/icon-arrow-down.svg");
          break;
        default:
          break;
      }
    });

    //SETTINGS FOR MINUTES

    $("#jq-pomodoro-up").click(function () {
      settingsMarshall.tPomodoro += 1;
      $("#jq-pomodoro-minutes").val(settingsMarshall.tPomodoro);
    });

    $("#jq-pomodoro-down").click(function () {
      if (settingsMarshall.tPomodoro <= 1) {
        return;
      }
      settingsMarshall.tPomodoro -= 1;
      $("#jq-pomodoro-minutes").val(settingsMarshall.tPomodoro);
    });

    $("#jq-shortbreak-up").click(function () {
      settingsMarshall.tSB += 1;
      $("#jq-shortbreak-minutes").val(settingsMarshall.tSB);
    });

    $("#jq-shortbreak-down").click(function () {
      if (settingsMarshall.tSB <= 1) {
        return;
      }
      settingsMarshall.tSB -= 1;
      $("#jq-shortbreak-minutes").val(settingsMarshall.tSB);
    });

    $("#jq-longbreak-up").click(function () {
      settingsMarshall.tLB += 1;
      $("#jq-longbreak-minutes").val(settingsMarshall.tLB);
    });

    $("#jq-longbreak-down").click(function () {
      if (settingsMarshall.tLB <= 1) {
        return;
      }
      settingsMarshall.tLB -= 1;
      $("#jq-longbreak-minutes").val(settingsMarshall.tLB);
    });

    //Submit the settings data to the rest of the app
    $(".button-apply").click(function () {
      newTime = 0;
      //Apply the settings
      timePomodoro = $("#jq-pomodoro-minutes").val() * 60;
      timeSB = $("#jq-shortbreak-minutes").val() * 60;
      timeLB = $("#jq-longbreak-minutes").val() * 60;
      currentSettings = { ...settingsMarshall };

      switch (currentMode) {
        case "pomodoro":
          modeTime = timePomodoro;
          break;
        case "longbreak":
          modeTime = timeLB;
          break;
        case "shortbreak":
          modeTime = timeSB;
          break;
        default:
          console.log("Error applying Marshall settings to main settings");
      }
      //Reset the timer
      timeLeft = modeTime;
      setTime(timeLeft);
      finishedCycle = false;
      running = false;
      clearInterval(pomodoro);
      $(".timer-control").text("START");

      //Close the modal
      $(".settings-overlay-backing").removeClass("modal-active");
    });
    $("#mode-pomodoro").prop("disabled", true);
  });

  window.onresize = () => {
    var w = window.innerWidth;
    var h = window.innerHeight;
  };
  // timer code end
});

// edit code
// get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// edit taks function
function editTask(e) {
  modal.style.display = "block";
  e.parentNode.parentNode.removeAttribute("onclick"); //removing default onclick
  let oldText = e.parentNode.parentNode.innerText;
  let firstElement = e.parentNode.parentNode.firstElementChild;
  let secondElement = e.parentNode.parentNode.children[1];
  let lastElement = e.parentNode.parentNode.lastElementChild;
  let editedTodo = e.parentNode.parentNode;
  let input = document.getElementById("editInput");
  let editBtn = document.getElementById("editNow");
  input.value = oldText;
  if (input.value !== "") {
    editBtn.onclick = () => {
      editedTodo.innerText = "";
      let newText = document.createTextNode(input.value);
      newText.innerText = input.value;
      editedTodo.appendChild(firstElement);
      editedTodo.appendChild(newText);
      editedTodo.appendChild(secondElement);
      editedTodo.appendChild(lastElement);
      modal.style.display = "none";
      e.parentNode.parentNode.setAttribute("onclick", "handleStatus(this)"); // adding default onclick
    };
  }
}

// function to clear all
function clearAll() {
  let todos = document.getElementById("mytodos");

  todos.innerHTML = "";
}
