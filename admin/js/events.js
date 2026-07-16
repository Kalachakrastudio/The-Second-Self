// =========================================
// Events Module
// =========================================

const eventModal = document.getElementById("eventModal");

const addEventBtn = document.getElementById("addEventBtn");

const closeModal = document.getElementById("closeModal");

const cancelEvent = document.getElementById("cancelEvent");

function openEventModal(){

    eventModal.classList.add("show");

}

function closeEventModal(){

    eventModal.classList.remove("show");

}

addEventBtn.addEventListener("click",openEventModal);

closeModal.addEventListener("click",closeEventModal);

cancelEvent.addEventListener("click",closeEventModal);

window.addEventListener("click",(e)=>{

    if(e.target===eventModal){

        closeEventModal();

    }

});

// =========================================
// Ticket Rows
// =========================================

const ticketContainer=document.getElementById("ticketContainer");

const addTicketBtn=document.getElementById("addTicketRow");

function createTicketRow(){

    const row=document.createElement("div");

    row.className="ticket-row";

    row.innerHTML=`

<input
type="text"
placeholder="Ticket Name">

<input
type="number"
placeholder="Price">

<input
type="number"
placeholder="Limit">

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

addTicketBtn.addEventListener("click",createTicketRow);

// First Ticket

createTicketRow();
// =========================================
// Event Save
// =========================================

const eventForm=document.getElementById("eventForm");

eventForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Next step: Save Event");

    closeEventModal();

});
function eventsInit(){

    console.log("Events Module Loaded");

}
