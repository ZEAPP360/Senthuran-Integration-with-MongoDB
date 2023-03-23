let get_event = ()=>{
    let eventsContainer = document.getElementById("event")
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
    //   document.childNodes[0].style.backgroundColor="red"
      document.getElementById("ïmg").style.display="none"
      let events = "";
          result.data.calendar.map((event,i) => {
            events += ` 
            <tr>
            <th scope="row">${i+1}</th>
            <td> ${event.title}</td>
            <td> ${event.time}</td>
            <td>${event.date}</td>
         
          </tr>
`;
          });
      if (events === "") {
        events = `<div class="no-event" >
        <i class="fas fa-circle"></i><h3>${event.title} ${event.time}</h3>
            </div>`;
      }
      eventsContainer.innerHTML = events;
     
    })
    .catch(error => console.log('error', error));
  }


let get_today=()=>{
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://type.fit/api/quotes", requestOptions)
    .then(response => response.json())
    .then(result=>{
      let random = Math.random()*1000+1
      console.log(random.toFixed())
      let res = Object.values(result)
      console.log(res[random.toFixed()])
      var quote = document.getElementById("quote").innerText= res[random.toFixed()]["text"]
      console.log(quote)
      document.getElementById("auth").innerText= res[random.toFixed()]["author"]
    })
    .catch(error => console.log('error', error));
}


let logout = ()=>{
  localStorage.clear()
  window.location.replace("/login")
}

get_event()
get_today()