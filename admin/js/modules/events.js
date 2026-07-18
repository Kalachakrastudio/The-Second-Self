function initEvents() {
const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwIfn6XUQxdzsuzbJ4Gm-l3FP_1eOE6YWn_Np0MwpnhxMDrZfYlP00I5Pb92fdmuJEK/exec";

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

saveEvent(event);

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

<td>${event.date}</td>

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
data-id="${index}">

<i class="fa-solid fa-pen"></i>

</button>

<button
class="action-btn delete-btn"
data-id="${index}">

<i class="fa-solid fa-trash"></i>

</button>

</td>

</tr>

`;

});

}
loadEvents();

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

}
