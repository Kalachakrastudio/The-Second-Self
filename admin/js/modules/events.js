function initEvents() {
const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwQRiWw82Bp1PCWfnKUqr6Hh_pfm3KbHNzXgC_8Yxa1Jkmh_V5IAVHjB0BZpCX0XlNX/exec";

let events = [];

let editIndex = null;

const modal = document.getElementById("eventModal");

const form = document.getElementById("eventForm");

const table = document.getElementById("eventTable");

const ticketContainer = document.getElementById("ticketContainer");

function createTicketRow(){

const row=document.createElement("div");

row.className="ticket-row";

row.innerHTML=`

<input
type="text"
placeholder="Ticket Name"
class="ticket-name"
required>

<input
type="number"
placeholder="Price"
class="ticket-price"
required>

<input
type="number"
placeholder="Limit"
class="ticket-limit"
required>

<button
type="button"
class="delete-ticket">

<i class="fa-solid fa-trash"></i>

</button>

`;

row.querySelector(".delete-ticket").onclick=()=>{

row.remove();

};

ticketContainer.appendChild(row);

}
function resetTicketContainer(){

ticketContainer.innerHTML="";

createTicketRow();

}
document.getElementById("addEventBtn").onclick=()=>{

modal.classList.add("show");

form.reset();

editIndex=null;

resetTicketContainer();

};
function closeModal(){

modal.classList.remove("show");

}

document.getElementById("closeModal").onclick=closeModal;

document.getElementById("cancelEvent").onclick=closeModal;
document.getElementById("addTicketRow").onclick=()=>{

createTicketRow();

};
form.addEventListener("submit",function(e){

e.preventDefault();

const tickets=[];

document.querySelectorAll(".ticket-row").forEach(row=>{

tickets.push({

name:row.querySelector(".ticket-name").value,

price:row.querySelector(".ticket-price").value,

limit:row.querySelector(".ticket-limit").value

});

});

const event={

name:document.getElementById("eventName").value,

date:document.getElementById("eventDate").value,

time:document.getElementById("eventTime").value,

venue:document.getElementById("eventVenue").value,

city:document.getElementById("eventCity").value,

status:document.getElementById("eventStatusSelect").value,

tickets:tickets

};

if(editIndex !== null){

updateEvent(event);

}else{

saveEvent(event);

}
    
});
function renderEvents(){

table.innerHTML="";

if(events.length===0){

table.innerHTML=`

<tr>

<td colspan="6" class="empty-row">

<i class="fa-solid fa-calendar-xmark"></i>

<p>No Events Found</p>

<small>Create your first event.</small>

</td>

</tr>

`;

return;

}

events.forEach((event,index)=>{

table.innerHTML+=`

<tr>

<td>${event.name}</td>

<td>
   ${new Date(event.date).toLocaleDateString("en-IN",{
day:"2-digit",
month:"short",
year:"numeric"
})}

<br>

<small>
${new Date("1970-01-01T"+event.time).toLocaleTimeString("en-IN",{
hour:"numeric",
minute:"2-digit",
hour12:true
})}
</small>
</td>

<td>${event.city}</td>

<td>

<span class="status ${event.status.toLowerCase()}">

${event.status}

</span>

</td>

<td>${event.tickets.length}</td>

<td>

<button
class="action-btn edit-btn"
data-id="${event.id}">

<i class="fa-solid fa-pen"></i>

</button>

<button
class="action-btn delete-btn"
data-id="${event.id}">

<i class="fa-solid fa-trash"></i>

</button>

</td>

</tr>

`;

});
    document.querySelectorAll(".edit-btn").forEach(btn=>{

    btn.onclick=()=>{

        editEvent(btn.dataset.id);

    };

});

document.querySelectorAll(".delete-btn").forEach(btn=>{

    btn.onclick=()=>{

        deleteEvent(btn.dataset.id);

    };

});

}
loadEvents();

    async function deleteEvent(id){

if(!confirm("Delete this event?")) return;

const response = await fetch(SCRIPT_URL,{

method:"POST",

headers:{
"Content-Type":"text/plain;charset=utf-8"
},

body:JSON.stringify({

action:"deleteEvent",

id:id

})

});

const result=await response.json();

if(result.success){

loadEvents();

}

}
    function editEvent(id){

const event = events.find(e=>e.id==id);

if(!event) return;

modal.classList.add("show");

document.getElementById("eventName").value=event.name;

document.getElementById("eventDate").value =
event.date;

document.getElementById("eventTime").value =
event.time;

document.getElementById("eventVenue").value=event.venue;

document.getElementById("eventCity").value=event.city;

document.getElementById("eventStatusSelect").value=event.status;

ticketContainer.innerHTML="";

event.tickets.forEach(ticket=>{

createTicketRow();

const row=ticketContainer.lastElementChild;

row.querySelector(".ticket-name").value=ticket.name;

row.querySelector(".ticket-price").value=ticket.price;

row.querySelector(".ticket-limit").value=ticket.limit;

});

editIndex=id;

}
async function updateEvent(event){

event.id=editIndex;

const response=await fetch(SCRIPT_URL,{

method:"POST",

headers:{
"Content-Type":"text/plain;charset=utf-8"
},

body:JSON.stringify({

action:"updateEvent",

...event

})

});

const result=await response.json();

if(result.success){

alert("Event Updated");

editIndex=null;

closeModal();

loadEvents();

}

}
async function saveEvent(event){

try{

const response = await fetch(SCRIPT_URL,{
    method:"POST",
    redirect:"follow",
    headers:{
        "Content-Type":"text/plain;charset=utf-8"
    },
    body:JSON.stringify({
        action:"saveEvent",
        name:event.name,
        date:event.date,
        time:event.time,
        venue:event.venue,
        city:event.city,
        status:event.status,
        tickets:event.tickets
    })
});

const text = await response.text();

console.log(text);

const result = JSON.parse(text);

if(result.success){

alert("Event Created Successfully");

closeModal();

form.reset();

resetTicketContainer();

await loadEvents();

}

else{

alert("Unable to Save Event");

}

}

catch(error){

console.log(error);

alert("Connection Error");

}

}

async function loadEvents(){

try{

const response = await fetch(
SCRIPT_URL + "?action=getEvents"
);

const result = await response.json();

console.log(result);

if(result.success){

events = result.events;

renderEvents();

}

}catch(err){

console.log(err);

}

}
    
function formatDate(dateString){

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN",{

        day:"2-digit",
        month:"short",
        year:"numeric"

    });

}

function formatTime(timeString){

    const date = new Date(timeString);

    return date.toLocaleTimeString("en-IN",{

        hour:"2-digit",
        minute:"2-digit",
        hour12:true,
        timeZone:"UTC"

    });

}
}
