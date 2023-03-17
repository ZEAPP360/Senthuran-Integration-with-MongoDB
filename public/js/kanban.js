// main function
function mySubmit(e) {
  let projectNo = e.getAttribute("aria-label");
  let i = e.id.replace(`project-${projectNo}-form-`, "");
  let id = i.replace(/-[0-9]/, "");
  let formNo = i.replace(/[0-9]-/, "");
  const form = document.getElementById(
    `project-${projectNo}-form-${id}-${formNo}`
  );
  const input = document.getElementById(
    `project-${projectNo}-input-${id}-${formNo}`
  );
  const todoLane = document.getElementById(
    `project-${projectNo}-todo-lane-${id}-${formNo}`
  );
  // console.log(form,input,todoLane)
  // adding new todos
  let pId = 0;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    pId = pId + 1;
    let paraId = `project-${projectNo}-lane-${formNo}-paraId-${pId}`;
    const value = input.value;

    if (!value) return;

    const newTask = document.createElement("p");
    newTask.classList.add("task");
    newTask.id = paraId;
    newTask.setAttribute("draggable", "true");
    let btn =
      "<span id='" +
      paraId +
      "' class='todo-controll'><img onclick='editTask(this)' class='edit' width='20px' src='pencil.png'><img class='delete' width='20px' onclick='deleteTask(this)' src='delete.png'><span>";
    newTask.innerHTML = value + btn;

    newTask.addEventListener("dragstart", () => {
      newTask.classList.add("is-dragging");
    });

    newTask.addEventListener("dragend", () => {
      newTask.classList.remove("is-dragging");
    });

    todoLane.appendChild(newTask);

    input.value = "";
  });

  // draggable function
  const draggables = document.querySelectorAll(".task");
  const droppables = document.querySelectorAll(".swim-lane");

  draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("is-dragging");
    });
  });

  droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      const bottomTask = insertAboveTask(zone, e.clientY);
      const curTask = document.querySelector(".is-dragging");

      if (!bottomTask) {
        zone.appendChild(curTask);
      } else {
        zone.insertBefore(curTask, bottomTask);
      }
    });
  });

  const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
      const { top } = task.getBoundingClientRect();

      const offset = mouseY - top;

      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestTask = task;
      }
    });

    return closestTask;
  };
}

// sideboards toggel
let sideBoards = document.getElementById("side-boards");
sideBoards.addEventListener("click", () => {
  console.log("click");
  let sideOpen = document.getElementById("side-boards");
  let aside = document.getElementById("myside");
  sideOpen.classList.toggle("rotate");
  //  console.log(aside[0])
  // aside.style.width = "210px";
  aside.style.height = "96%";
  aside.classList.toggle("test");
  let night = document.getElementsByTagName("body");
  night[0].style.backgroundColor = "black";
});

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
  let navImg = document.querySelectorAll(".nav-bar img");
  for (i = 0; i < navImg.length; i++) {
    navImg[i].classList.toggle("invert");
  }
  console.log(navImg);
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
  } else {
    img.target.src = "icons/sun.png";
    img.target.alt = "light";
    document.documentElement.style.setProperty("--nav-color", "#ffffff");
    document.documentElement.style.setProperty("--body-color", "#fdb44b");
    document.documentElement.style.setProperty("--side-nav", "#fdb44b");
    document.documentElement.style.setProperty("--text-color", "#000000");
    document.documentElement.style.setProperty("--taskBg", "white");
    document.documentElement.style.setProperty("--addTask", "rgb(216 214 214)");
    document.documentElement.style.setProperty("--main-color", "#fdb44b");
  }
});

// adding new board

let projectId = 1;
let addBoard = document.getElementById("addBoard");
let myBoards = document.getElementById("my-boards");
let newName = document.getElementById("NewProject");
addBoard.addEventListener("click", () => {
  if (newName.value !== "") {
    projectId = projectId + 1;
    let boardTemplate = `
  <div id="board-${projectId}" class="currentBoard">
  
    <h1 id="board-${projectId}-head" class="projects-head">${newName.value}</h1>
  
      <div class="lanes">
          <div id="project-${projectId}-todo-lane-${projectId}-1" class="swim-lane todo-lane">
              <h3 class="heading">TODO</h3>
              <div class="creaters">
                  <form aria-details="1" aria-label="${projectId}" id="project-${projectId}-form-${projectId}-1" onclick="mySubmit(this)" >
                  
                      <input type="text" id="project-${projectId}-input-${projectId}-1" placeholder="project name" class="projectName">
                      <button type="submit" class="addTask"><span style="font: 80;">+</span> add task</button>
                  </form>
              </div>
          </div>
  
          <div id="project-${projectId}-todo-lane-${projectId}-2" class="swim-lane">
              <h3 class="heading">Doing</h3>
              <div class="creaters">
                  <form aria-details="2" aria-label="${projectId}" id="project-${projectId}-form-${projectId}-2" onclick="mySubmit(this)" >
                  
                      <input type="text" id="project-${projectId}-input-${projectId}-2" placeholder="project name" class="projectName">
                      <button type="submit" class="addTask"><span style="font: 80;">+</span> add task</button>
                  </form>
              </div>
          </div>
  
          <div id="project-${projectId}-todo-lane-${projectId}-3" class="swim-lane">
              <h3 class="heading">Done</h3>
              <div class="creaters">
                  <form aria-details="3" aria-label="${projectId}" id="project-${projectId}-form-${projectId}-3" onclick="mySubmit(this)" >
                  
                      <input type="text" id="project-${projectId}-input-${projectId}-3" placeholder="project name" class="projectName">
                      <button type="submit" class="addTask"><span style="font: 80;">+</span> add task</button>
                  </form>
              </div>
          </div>
      </div>
  </div>`;

    let aside = document.getElementById("aside-boards");
    aside.innerHTML +=
      "<p onclick='switchBoards(this.id)' class='projects active-project' id='project-" +
      projectId +
      "'>" +
      newName.value +
      " <span id='" +
      projectId +
      "' class='todo-controll'><img onclick='editBoard(this)' class='edit' width='20px' src='pencil.png'><img class='delete' width='20px' onclick='deleteBoards(this)' src='delete.png'><span> </p>";
    myBoards.innerHTML += boardTemplate;
    let newBoard = document.getElementById("board-" + projectId);
    let old = projectId - 1;
    let oldBoard = document.getElementById("board-" + old);
    oldBoard.classList.remove("active");
    newBoard.classList.add("active");
    document
      .getElementById("project-" + old)
      .classList.remove("active-project");
    newName.value = "";
  }
});

// switching to old boards
function switchBoards(e) {
  let i = e.toString();
  let id = i.replace("project-", "");
  let showBoard = document.getElementById("board-" + id);
  let oldBoard = document.getElementsByClassName("currentBoard");
  let allProjects = document.getElementsByClassName("projects");
  for (i = 0; i < oldBoard.length; i++) {
    // hidding non active boards
    if (oldBoard[i].classList.contains("active")) {
      oldBoard[i].classList.remove("active");
    }
    // hiding non active projects
    if (allProjects[i].classList.contains("active-project")) {
      allProjects[i].classList.remove("active-project");
    }
  }
  showBoard.classList.add("active");
  // console.log("switching", id)
  document.getElementById("project-" + id).classList.add("active-project");
}

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

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

// editing the todos
let modal = document.getElementById("myModal");
function editTask(e) {
  let task = document.getElementById(e.parentNode.id);
  // console.log(task.innerText)
  modal.style.display = "block";
  let input = document.getElementById("editInput");
  input.value = task.innerText;
  let editBtn = document.getElementById("editNow");
  editBtn.onclick = () => {
    if (input.value !== "") {
      let oldElements = task.children[0];
      task.innerText = input.value;
      task.append(oldElements);
      modal.style.display = "none";
    }
  };
}

// deleting the task
function deleteTask(e) {
  let task = document.getElementById(e.parentNode.id);
  task.remove();
}

// delete boards function
function deleteBoards(e) {
  projectId = projectId - 1;
  e.parentNode.parentNode.removeAttribute("onclick"); //removed  parrent function switichboard
  let id = e.parentNode.id;
  let currentBoard = document.getElementById("board-" + id);
  let oldBoard = currentBoard.previousElementSibling;
  let projectName = document.getElementById(e.parentNode.parentNode.id);
  let projectTitle = document.getElementsByClassName("projects");
  let oldProjectTitle = projectName.previousElementSibling;
  currentBoard.remove();
  projectName.remove();
  let allBoards = document.getElementsByClassName("currentBoard ");
  for (i = 0; i < allBoards.length; i++) {
    // hidding non active boards
    if (allBoards[i].classList.contains("active")) {
      allBoards[i].classList.remove("active");
    }
  }
  for (j = 0; j < projectTitle.length; j++) {
    // hidding non active project titles
    if (projectTitle[j].classList.contains("active-project")) {
      projectTitle[j].classList.remove("active-project");
    }
  }
  oldBoard.classList.add("active");

  oldProjectTitle.classList.add("active-project");
}

// edit boards function
function editBoard(e) {
  let oldElements = e.parentNode.parentNode.children[0];
  let projectText = e.parentNode.parentNode;
  let headId = e.parentNode.id;
  let heads = document.getElementById(`board-${headId}-head`);
  modal.style.display = "block";
  let input = document.getElementById("editInput");
  input.value = projectText.innerText;
  let editBtn = document.getElementById("editNow");

  editBtn.onclick = () => {
    if (input.value !== "") {
      projectText.innerText = input.value;
      heads.innerText = input.value;
      projectText.append(oldElements);
      modal.style.display = "none";
    }
  };
}
