// main function
// let projectshead = document.getElementsByClassName("projects-head")
// console.log(projectshead[0].innerText)
function mySubmit(e, chk) {
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
    console.log(e)
    e.preventDefault();
    console.log(chk)
    console.log(e)
    pId = pId + 1;
    let paraId = `project-${projectNo}-lane-${formNo}-paraId-${pId}`;
    console.log(paraId)
    const value = input.value;

    if (!value) return;
    let board_name = $(".currentBoard.active .projects-head")
    console.log(board_name[0].parentNode.childNodes[1].getAttribute("dataid"))

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");
    let userid = localStorage.getItem("User_Id")
    var raw = JSON.stringify({
      title: value,
      user: userid,
      Board_id: board_name[0].parentNode.childNodes[1].getAttribute("dataid"),
      type: chk == "1" ? "TODO" : chk == "2" ? "Doing" : chk == "3" ? "Done" : "Not define"
    });
    console.log(raw)


    let getchk = chk == "1" ? "TODO" : chk == "2" ? "Doing" : chk == "3" ? "Done" : "Not define"
    console.log(getchk)

    let data_todo = getchk == "TODO" ? document.getElementById("todo_data")
      :
      getchk == "Doing" ? document.getElementById("Doing_data")
        :
        getchk == "Done" ? document.getElementById("Done_data")
          :
          "no"


    console.log(data_todo.childNodes.length)



    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const newTask = document.createElement("p");

    fetch("http://127.0.0.1:3000/todo/add", requestOptions)
      .then(response => response.text())
      .then((res) => {
        console.log(JSON.parse(res))
        let getres = JSON.parse(res)
        console.log(getres.result._id)
        // window.location.reload()



        // const newTask = document.createElement("p");
        //   newTask.classList.add("task");
        //   newTask.id = i;
        //   newTask.setAttribute("draggable", "true");
        //   let btn =
        //     "<span id='" +
        //    v._id +
        //     "' class='todo-controll' ><img onclick='editTask(this)' id=${v._id} class='edit' width='20px' src='pencil.png'><img class='delete'  id=${v._id} width='20px' onclick='deleteTask(this)' src='delete.png'><span>";
        //   newTask.innerHTML = v.title  + btn;

        //   newTask.addEventListener("dragstart", () => {
        //     newTask.classList.add("is-dragging");
        //   });

        //   newTask.addEventListener("dragend", () => {
        //     newTask.classList.remove("is-dragging");
        //   });

        const newTask = document.createElement("p");
        newTask.classList.add("task");
        newTask.id = data_todo.childNodes.length;
        newTask.setAttribute("draggable", "true");
        let btn =
          "<span id='" +
          getres.result._id +
          "' class='todo-controll' ><img onclick='editTask(this)' id=${v._id} class='edit' width='20px' src='pencil.png'><img class='delete'  id=${v._id} width='20px' onclick='deleteTask(this)' src='delete.png'><span>";
        newTask.innerHTML = `<i>${getres.result.title}</i>` + btn;

        newTask.addEventListener("dragstart", (e) => {
          console.log(e)
          newTask.classList.add("is-dragging");
        });

        newTask.addEventListener("dragend", async (e) => {
          console.log(e.target)
          console.log(e.target.parentNode.id)
          let data = e.target.parentNode.id == "todo_data" ? "TODO" :
          e.target.parentNode.id == "Doing_data" ? "Doing" :
            e.target.parentNode.id == "Done_data" ? "Done" : "jshjs"
        var raw = JSON.stringify({
          "type": data,
        });
    
        console.log(raw)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");
    
        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        await fetch(`http://127.0.0.1:3000/todo/updatetodo/${e.target.childNodes[1].id}`, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    
         



         

          newTask.classList.remove("is-dragging");
        });

        data_todo.appendChild(newTask)





      })
      .catch((e) => console.log(e))



    input.value = "";




  });

  // draggable function
  const draggables = document.querySelectorAll(".task");
  const droppables = document.querySelectorAll(".swim-lane");

  draggables.forEach((task) => {
    task.addEventListener("dragstart", async (e) => {
      console.log(e.target)
      console.log(e.target.parentNode.id)
    });
    task.addEventListener("dragend", async (e) => {
      console.log(e.target.childNodes[1].id)
      console.log(e.target.parentNode.id)

      let data = e.target.parentNode.id == "todo_data" ? "TODO" :
      e.target.parentNode.id == "Doing_data" ? "Doing" :
        e.target.parentNode.id == "Done_data" ? "Done" : "jshjs"
    var raw = JSON.stringify({
      "type": data,
    });

    console.log(raw)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(`http://127.0.0.1:3000/todo/updatetodo/${e.target.childNodes[1].id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

     


      task.classList.remove("is-dragging");
    });
  });

  droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      const bottomTask = insertAboveTask(zone, e.clientY);
      const curTask = document.querySelector(".is-dragging");

      if (!bottomTask) {
        console.log(zone.id)
        console.log(curTask)

        let getinsertdoc = zone.id =="project-1-todo-lane-1-1"? 
        "todo_data" :
        zone.id=="project-1-todo-lane-1-2"?
        "Doing_data" :
        zone.id=="project-1-todo-lane-1-3"?
        "Done_data":"no"

       let getdiv =  document.getElementById(getinsertdoc)

       console.log(getdiv.childNodes.length)
       curTask.id=getdiv.childNodes.length-1
       getdiv.appendChild(curTask)




        // zone.appendChild(curTask);
      } else {
        let getinsertdoc = zone.id =="project-1-todo-lane-1-1"? 
        "todo_data" :
        zone.id=="project-1-todo-lane-1-2"?
        "Doing_data" :
        zone.id=="project-1-todo-lane-1-3"?
        "Done_data":"no"

       let getdiv =  document.getElementById(getinsertdoc)

       console.log(getdiv.childNodes.length)
       curTask.id=getdiv.childNodes.length-1
      //  getdiv.appendChild(curTask)

        getinsertdoc.insertBefore(curTask, bottomTask);
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
    //   let boardTemplate = `
    // <div id="board-${projectId}" class="currentBoard">

    //   <h1 id="board-${projectId}-head" class="projects-head">${newName.value}</h1>

    //     <div class="lanes">
    //         <div id="project-${projectId}-todo-lane-${projectId}-1" class="swim-lane todo-lane">
    //             <h3 class="heading">TODO</h3>
    //             <div class="creaters">
    //                 <form aria-details="1" aria-label="${projectId}" id="project-${projectId}-form-${projectId}-1" onclick="mySubmit(this,1)" >

    //                     <input type="text" id="project-${projectId}-input-${projectId}-1" placeholder="project name" class="projectName">
    //                     <button type="submit" class="addTask"><span style="font: 80;">+</span> add task</button>
    //                 </form>
    //             </div>
    //         </div>

    //         <div id="project-${projectId}-todo-lane-${projectId}-2" class="swim-lane">
    //             <h3 class="heading">Doing</h3>
    //             <div class="creaters">
    //                 <form aria-details="2" aria-label="${projectId}" id="project-${projectId}-form-${projectId}-2" onclick="mySubmit(this,2)" >

    //                     <input type="text" id="project-${projectId}-input-${projectId}-2" placeholder="project name" class="projectName">
    //                     <button type="submit" class="addTask"><span style="font: 80;">+</span> add task</button>
    //                 </form>
    //             </div>
    //         </div>

    //         <div id="project-${projectId}-todo-lane-${projectId}-3" class="swim-lane">
    //             <h3 class="heading">Done</h3>
    //             <div class="creaters">
    //                 <form aria-details="3" aria-label="${projectId}" id="project-${projectId}-form-${projectId}-3" onclick="mySubmit(this,3)" >

    //                     <input type="text" id="project-${projectId}-input-${projectId}-3" placeholder="project name" class="projectName">
    //                     <button type="submit" class="addTask"><span style="font: 80;">+</span> add task</button>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // </div>`;

    let aside = document.getElementById("aside-boards");
    aside.innerHTML +=
      "<p onclick='switchBoards(this.id)' class='projects active-project' id='project-" +
      projectId +
      "'>" +
      newName.value +
      " <span id='" +
      projectId +
      "' class='todo-controll'><img onclick='editBoard(this)' class='edit' width='20px' src='pencil.png'><img class='delete' width='20px' onclick='deleteBoards(this)' src='delete.png'><span> </p>";
    // myBoards.innerHTML += boardTemplate;
    let newBoard = document.getElementById("board-" + projectId);
    let old = projectId - 1;
    let oldBoard = document.getElementById("board-" + old);
    // oldBoard.classList.remove("active");
    // newBoard.classList.add("active");
    // document
    //   .getElementById("project-" + old)
    //   .classList.remove("active-project");

    let User_Id = localStorage.getItem("User_Id")
    console.log(User_Id)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");

    var raw = JSON.stringify({
      "user_id": User_Id,
      "title": newName.value
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:3000/todo/addBoard", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    newName.value = "";
    window.location.reload()


  }
});

// switching to old boards
function switchBoards(e) {

  let data = document.getElementsByClassName("task")
  for (var i = 0; i < data.length; i++) {
    data[i].style.display = "none"
  }

  console.log(e.classList[1])
  if (e.classList[1] != "active-project") {
    console.log(e.childNodes[1].id)
    let project_name = document.getElementById("board-1-head")
    project_name.innerText = e.innerText
    project_name.setAttribute("dataid", e.childNodes[1].id)

    console.log(e.innerText)
    gettododata(e)
    getDodata(e)
    getDonedata(e)
    let i = e.id.toString();
    let id = i.replace("project-", "");
    console.log(i)
    // let showBoard = document.getElementById("board-" + id);
    // let oldBoard = document.getElementsByClassName("currentBoard");
    let allProjects = document.getElementsByClassName("projects");
    for (i = 0; i < allProjects.length; i++) {
      //   // hidding non active boards
      //   if (oldBoard[i].classList.contains("active")) {
      //     oldBoard[i].classList.remove("active");
      //   }
      //   // hiding non active projects
      if (allProjects[i].classList.contains("active-project")) {
        allProjects[i].classList.remove("active-project");
      }


      // showBoard.classList.add("active");
      // // console.log("switching", id)
      document.getElementById(e.id.toString()).classList.add("active-project");
    }
  }

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
  // let task = document.getElementById(e);\
  console.log(e)
  console.log(e.parentNode.parentNode.childNodes[0].innerText)
  console.log(e.parentNode.parentNode.childNodes[0].innerText)
  let id = e.parentNode.parentNode.id
  console.log(id)
  console.log(e.parentNode.parentNode.parentNode.childNodes[id].innerText)
  modal.style.display = "block";
  let input = document.getElementById("editInput");
  input.value = e.parentNode.parentNode.childNodes[0].innerText;
  let editBtn = document.getElementById("editNow");
  editBtn.onclick = () => {
    if (input.value !== "") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "title": input.value,
      });

      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`http://127.0.0.1:3000/todo/updatetodo/${e.parentNode.id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      // window.location.reload()

      e.parentNode.parentNode.childNodes[0].innerText = input.value

      // document.getElementById(e.parentNode.parentNode.parentNode.id).innerHTML=`
      // ${input.value}
      // <span id=${e.parentNode.id} class="todo-controll">
      // <img onclick="editTask(this)" class="edit" width="20px" src="pencil.png">
      // <img class="delete" width="20px" onclick="deleteTask(this)" src="delete.png">
      // <span>
      // </span></span>

      // `
      // console.log( document.getElementById(e.parentNode.parentNode.id))


      modal.style.display = "none";
    }
  };
}

// deleting the task
async function deleteTask(e) {

  console.log(e.parentNode.id)
  let useruid = localStorage.getItem("User_Id")
  console.log(useruid)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");

  var raw = JSON.stringify({
    "_id": e.parentNode.id
  });

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`http://127.0.0.1:3000/todo/deletetodo`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  let task = document.getElementById(e.parentNode.id);
  task.remove();
  window.location.reload()

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


function deleteBoard(e) {
  console.log(e.parentNode.parentNode)
  console.log(e.parentNode.parentNode.children[0].id)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");

  var raw = JSON.stringify({
    "_id": e.parentNode.parentNode.children[0].id
  });

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`http://127.0.0.1:3000/todo/deleteBoard/${e.parentNode.parentNode.children[0].id}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  let task = document.getElementById(e.parentNode.id);
  task.remove();
  window.location.reload()


}

// edit boards function
function editBoard(e) {
  // let res = e.parentNode.parentNode.children[0]
  let current_id = localStorage.setItem("currentitem", e.parentNode.parentNode.children[0].id)
  console.log(e.parentNode.parentNode.children[0])
  console.log(e.parentNode.parentNode.children[0].id)
  let oldElements = e.parentNode.parentNode.children[0];
  let projectText = e.parentNode.parentNode;
  let headId = e.parentNode.id;
  // let heads = document.getElementById(`board-${headId}-head`);
  modal.style.display = "block";
  let input = document.getElementById("editInput");
  input.value = projectText.innerText;
  let editBtn = document.getElementById("editNow");

  editBtn.onclick = (res) => {
    console.log(res)
    if (input.value !== "") {
      let current_id = localStorage.getItem("currentitem")

      projectText.innerText = input.value;
      // console.log(e.parentNode.parentNode.children)
      // heads.innerText = input.value;

      let User_Id = localStorage.getItem("User_Id")
      console.log(User_Id)

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "title": input.value,
        "user_id": User_Id
      });

      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`http://127.0.0.1:3000/todo/updateBoard/${current_id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


      projectText.append(oldElements);
      modal.style.display = "none";


    }
  };

}


//GET TODO DATA 
let gettododata = (e) => {
  console.log(e.childNodes[1].id)

  let project_1 = document.getElementById("todo_data")
  project_1.innerHTML = ""

  let User_Id = localStorage.getItem("User_Id")
  console.log(User_Id)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");

  var raw = JSON.stringify({
    "user": User_Id,
    "type": "TODO",
    "Board_id": e.childNodes[1].id
  });

  var requestOptions = {
    method: 'POST',  // Change method to POST
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:3000/todo/gettodo", requestOptions)
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
      // Do something with the parsed data object
      // console.log(data.data);
      data.data.map((v, i) => {
        console.log(v.title)
        const newTask = document.createElement("p");
        newTask.classList.add("task");
        newTask.id = i;
        newTask.setAttribute("draggable", "true");
        let btn =
          "<span id='" +
          v._id +
          "' class='todo-controll' ><img onclick='editTask(this)' id=${v._id} class='edit' width='20px' src='pencil.png'><img class='delete'  id=${v._id} width='20px' onclick='deleteTask(this)' src='delete.png'><span>";
        newTask.innerHTML = `<i>${v.title} </i>` + btn;

        newTask.addEventListener("dragstart", async (e) => {
          console.log(e.target)
          console.log(e.target.parentNode.id)
        })

        newTask.addEventListener("dragend", async (e) => {
          console.log(e.target)
          console.log(e.target.parentNode.id)

         

          newTask.classList.remove("is-dragging");
        });

        project_1.appendChild(newTask)

        const draggables = document.querySelectorAll(".task");
        const droppables = document.querySelectorAll(".swim-lane");

        draggables.forEach((task) => {
          task.addEventListener("dragstart", async (e) => {
            console.log(e.target)
            console.log(e.target.parentNode.id)
            task.classList.add("is-dragging");
          });
          task.addEventListener("dragend", async (e) => {
            console.log(e.target)
            console.log(e.target.parentNode.id)

            let data = e.target.parentNode.id == "todo_data" ? "TODO" :
            e.target.parentNode.id == "Doing_data" ? "Doing" :
              e.target.parentNode.id == "Done_data" ? "Done" : "jshjs"
          var raw = JSON.stringify({
            "type": data ,
          });

          console.log(raw)
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");

          var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          await fetch(`http://127.0.0.1:3000/todo/updatetodo/${e.target.childNodes[1].id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

            task.classList.remove("is-dragging");
          });
        });

        droppables.forEach((zone) => {
          zone.addEventListener("dragover", (e) => {
            e.preventDefault();
            const bottomTask = insertAboveTask(zone, e.clientY);
            const curTask = document.querySelector(".is-dragging");

            if (!bottomTask) {
              console.log(zone.id)
              console.log(curTask)

              let getinsertdoc = zone.id =="project-1-todo-lane-1-1"? 
              "todo_data" :
              zone.id=="project-1-todo-lane-1-2"?
              "Doing_data" :
              zone.id=="project-1-todo-lane-1-3"?
              "Done_data":"no"

             let getdiv =  document.getElementById(getinsertdoc)

             console.log(getdiv.childNodes.length)
             curTask.id=getdiv.childNodes.length-1
             getdiv.appendChild(curTask)




              // zone.appendChild(curTask);
            } else {
              let getinsertdoc = zone.id =="project-1-todo-lane-1-1"? 
              "todo_data" :
              zone.id=="project-1-todo-lane-1-2"?
              "Doing_data" :
              zone.id=="project-1-todo-lane-1-3"?
              "Done_data":"no"

             let getdiv =  document.getElementById(getinsertdoc)

             console.log(getdiv.childNodes.length)
             curTask.id=getdiv.childNodes.length-1
            //  getdiv.appendChild(curTask)

              getinsertdoc.insertBefore(curTask, bottomTask);
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
      })
    })

    .catch(error => console.log('error', error));
}


//get doing task from db ]

let getDodata = (e) => {

  console.log(e.childNodes[1].id)

  let project_1 = document.getElementById("Doing_data")
  project_1.innerHTML = ""

  let User_Id = localStorage.getItem("User_Id")
  console.log(User_Id)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");

  var raw = JSON.stringify({
    "user": User_Id,
    "type": "Doing",
    "Board_id": e.childNodes[1].id
  });


  var requestOptions = {
    method: 'POST',  // Change method to POST
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:3000/todo/gettodo", requestOptions)
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
      // Do something with the parsed data object
      // console.log(data.data);
      data.data.map((v, i) => {
        console.log(v.title)
        const newTask = document.createElement("p");
        newTask.classList.add("task");
        newTask.id = i;
        newTask.setAttribute("draggable", "true");
        let btn =
          "<span id='" +
          v._id +
          "' class='todo-controll'><img onclick='editTask(this)' class='edit' width='20px' src='pencil.png'><img class='delete' width='20px' onclick='deleteTask(this)' src='delete.png'><span>";
        newTask.innerHTML = `<i>${v.title} </i>` + btn;

        newTask.addEventListener("dragstart", async (e) => {
          console.log(e.target)
          console.log(e.target.parentNode.id)
        })

        newTask.addEventListener("dragend", async (e) => {
          console.log(e.target)
          console.log(e.target.parentNode.id)

         

          newTask.classList.remove("is-dragging");
        });

        project_1.appendChild(newTask)

        const draggables = document.querySelectorAll(".task");
        const droppables = document.querySelectorAll(".swim-lane");

        draggables.forEach((task) => {
          task.addEventListener("dragstart", async (e) => {
            console.log(e.target)
            console.log(e.target.parentNode.id)
            task.classList.add("is-dragging");
          });
          task.addEventListener("dragend", async (e) => {
            console.log(e.target)
            console.log(e.target.parentNode.id)
            let data = e.target.parentNode.id == "todo_data" ? "TODO" :
            e.target.parentNode.id == "Doing_data" ? "Doing" :
              e.target.parentNode.id == "Done_data" ? "Done" : "jshjs"
          var raw = JSON.stringify({
            "type": data,
          });

          console.log(raw)
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");

          var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          await fetch(`http://127.0.0.1:3000/todo/updatetodo/${e.target.childNodes[1].id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
            task.classList.remove("is-dragging");
          });
        });

        droppables.forEach((zone) => {
          zone.addEventListener("dragover", (e) => {
            e.preventDefault();
            const bottomTask = insertAboveTask(zone, e.clientY);
            const curTask = document.querySelector(".is-dragging");

            if (!bottomTask) {
              console.log(zone.id)
              console.log(curTask)

              let getinsertdoc = zone.id =="project-1-todo-lane-1-1"? 
              "todo_data" :
              zone.id=="project-1-todo-lane-1-2"?
              "Doing_data" :
              zone.id=="project-1-todo-lane-1-3"?
              "Done_data":"no"

             let getdiv =  document.getElementById(getinsertdoc)

             console.log(getdiv.childNodes.length)
             curTask.id=getdiv.childNodes.length-1
             getdiv.appendChild(curTask)




              // zone.appendChild(curTask);
            } else {
              let getinsertdoc = zone.id =="project-1-todo-lane-1-1"? 
              "todo_data" :
              zone.id=="project-1-todo-lane-1-2"?
              "Doing_data" :
              zone.id=="project-1-todo-lane-1-3"?
              "Done_data":"no"

             let getdiv =  document.getElementById(getinsertdoc)

             console.log(getdiv.childNodes.length)
             curTask.id=getdiv.childNodes.length-1
            //  getdiv.appendChild(curTask)

              getinsertdoc.insertBefore(curTask, bottomTask);
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
      })
    })

    .catch(error => console.log('error', error));


}

let getDonedata = (e) => {

  console.log(e.childNodes[1].id)

  let project_1 = document.getElementById("Done_data")
  project_1.innerHTML = ""

  let User_Id = localStorage.getItem("User_Id")
  console.log(User_Id)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");

  var raw = JSON.stringify({
    "user": User_Id,
    "type": "Done",
    "Board_id": e.childNodes[1].id
  });


  var requestOptions = {
    method: 'POST',  // Change method to POST
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:3000/todo/gettodo", requestOptions)
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
      // Do something with the parsed data object
      // console.log(data.data);
      data.data.map((v, i) => {
        console.log(v.title)
        const newTask = document.createElement("p");
        newTask.classList.add("task");
        newTask.id = i;
        newTask.setAttribute("draggable", "true");
        let btn =
          "<span id='" +
          v._id +
          "' class='todo-controll'><img onclick='editTask(this)' class='edit' width='20px' src='pencil.png'><img class='delete' width='20px' onclick='deleteTask(this)' src='delete.png'><span>";
        newTask.innerHTML = `<i>${v.title} </i>` + btn;

        newTask.addEventListener("dragstart", async (e) => {
          console.log(e.target)
          console.log(e.target.parentNode.id)
        })

        newTask.addEventListener("dragend", async (e) => {
          console.log(e.target)
          console.log(e.target.parentNode.id)

         

          newTask.classList.remove("is-dragging");
        });

        project_1.appendChild(newTask)

        const draggables = document.querySelectorAll(".task");
        const droppables = document.querySelectorAll(".swim-lane");

        draggables.forEach((task) => {
          task.addEventListener("dragstart", async (e) => {
            console.log(e.target)
            console.log(e.target.parentNode.id)
            task.classList.add("is-dragging");
          });
          task.addEventListener("dragend", async (e) => {
            console.log(e.target)
            console.log(e.target.parentNode.id)

            let data = e.target.parentNode.id == "todo_data" ? "TODO" :
            e.target.parentNode.id == "Doing_data" ? "Doing" :
              e.target.parentNode.id == "Done_data" ? "Done" : "jshjs"
          var raw = JSON.stringify({
            "type":data,
          });

          console.log(raw)
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");

          var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          await fetch(`http://127.0.0.1:3000/todo/updatetodo/${e.target.childNodes[1].id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

            task.classList.remove("is-dragging");
          });
        });

        droppables.forEach((zone) => {
          zone.addEventListener("dragover", (e) => {
            e.preventDefault();


            const bottomTask = insertAboveTask(zone, e.clientY);
            const curTask = document.querySelector(".is-dragging");

            if (!bottomTask) {
              console.log(zone.id)
              console.log(curTask)

              let getinsertdoc = zone.id =="project-1-todo-lane-1-1"? 
              "todo_data" :
              zone.id=="project-1-todo-lane-1-2"?
              "Doing_data" :
              zone.id=="project-1-todo-lane-1-3"?
              "Done_data":"no"

             let getdiv =  document.getElementById(getinsertdoc)

             console.log(getdiv.childNodes.length)
             curTask.id=getdiv.childNodes.length-1
             getdiv.appendChild(curTask)




              // zone.appendChild(curTask);
            } else {
              let getinsertdoc = zone.id =="project-1-todo-lane-1-1"? 
              "todo_data" :
              zone.id=="project-1-todo-lane-1-2"?
              "Doing_data" :
              zone.id=="project-1-todo-lane-1-3"?
              "Done_data":"no"

             let getdiv =  document.getElementById(getinsertdoc)

             console.log(getdiv.childNodes.length)
             curTask.id=getdiv.childNodes.length-1
            //  getdiv.appendChild(curTask)

              getinsertdoc.insertBefore(curTask, bottomTask);
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
      })
    })

    .catch(error => console.log('error', error));}


let getBoard = () => {

  let User_Id = localStorage.getItem("User_Id")
  console.log(User_Id)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");

  var raw = JSON.stringify({
    "user_id": User_Id
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:3000/todo/getBoard", requestOptions)
    .then(response => response.json())
    .then(result => {
      let data = result.data;
      let myboard = document.getElementById("my-boards")
      let myside = document.getElementById("aside-boards")
      // console.log(data)
      data.map((v, i) => {
        console.log(v)
        i == 0 ?

          myside.innerHTML += `

      <p
      onclick="switchBoards(this)"
      class="projects "
      id="project-${i + 1}"
    >
     ${v.title}
      <span id=${v._id} class="todo-controll"
        ><img
          onclick="editBoard(this)"
          class="edit"
          width="20px"
          src="pencil.png"
      />
    
      </span>
    </p>

    
    `:
          myside.innerHTML += `

    <p
    onclick="switchBoards(this)"
    class="projects "
    id="project-${i + 1}"
  >
   ${v.title}
    <span id=${v._id} class="todo-controll"
      ><img
        onclick="editBoard(this)"
        class="edit"
        width="20px"
        src="pencil.png"
    />
    <img class='delete'  id=${v._id} width='20px' onclick='deleteBoard(this)' src='delete.png'>
    </span>
  </p>
`


        i == 0 ?
          myboard.innerHTML += `
      <div id="board-${i + 1}" class="currentBoard active">
      <h1 id="board-${i + 1}-head" class="projects-head">${v.title}</h1>

      <div class="lanes">
        <div id="project-1-todo-lane-1-1" class="swim-lane todo-lane">
          <h3 class="heading">TODO</h3>

          <div class="creaters">
            <form
              aria-details="1"
              aria-label="1"
              id="project-1-form-1-1"
              onclick="mySubmit(this,'1')"
            >
              <input
                type="text"
                id="project-1-input-1-1"
                placeholder="Task Name"
                class="projectName"
              />
              <button type="submit" class="addTask">
                <span style="font: 80">+</span> add task
              </button>
            </form>
          </div>
          <div id="todo_data"></div>
        </div>

        <div id="project-1-todo-lane-1-2" class="swim-lane">
          <h3 class="heading">Doing</h3>

          <div class="creaters">
            <form
              aria-details="2"
              aria-label="1"
              id="project-1-form-1-2"
              onclick="mySubmit(this,'2')"
            >
              <input
                type="text"
                id="project-1-input-1-2"
                placeholder="Task Name"
                class="projectName"
              />
              <button type="submit" class="addTask">
                <span style="font: 80">+</span> add task
              </button>
            </form>
          </div>
          <div id="Doing_data"></div>
        </div>

        <div id="project-1-todo-lane-1-3" class="swim-lane">
          <h3 class="heading">Done</h3>

          <div class="creaters">
            <form
              aria-details="3"
              aria-label="1"
              id="project-1-form-1-3"
              onclick="mySubmit(this,'3')"
            >
              <input
                type="text"
                id="project-1-input-1-3"
                placeholder="Task Name"
                class="projectName"
              />
              <button type="submit" class="addTask">
                <span style="font: 80">+</span> add task
              </button>
            </form>
          </div>
          <div id="Done_data"></div>

        </div>
      </div>
    </div>
      `
          :
          console.log("jsjh")

        let data = myboard
        console.log("jlj")
        data.click()
        // console.log(data)



      })
    })
    .catch(error => console.log('error', error));
}



getBoard()
// gettododata()
// getDodata()
// getDonedata()



let logout = () => {
  localStorage.clear()
  window.location.replace("/login")
}

clickdefault = () => {
  let data = document.getElementById("project-1").click()
  console.log(data)

}

setTimeout(() => {
  clickdefault()
}, 1500)
clickdefault()