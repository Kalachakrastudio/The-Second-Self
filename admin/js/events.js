function eventsInit(){

    const eventModal = document.getElementById("eventModal");

    const addEventBtn = document.getElementById("addEventBtn");

    const closeModal = document.getElementById("closeModal");

    const cancelEvent = document.getElementById("cancelEvent");

    const ticketContainer = document.getElementById("ticketContainer");

    const addTicketBtn = document.getElementById("addTicketRow");

    function openModal(){

        eventModal.classList.add("show");

    }

    function closeModalFn(){

        eventModal.classList.remove("show");

    }

    addEventBtn.addEventListener("click",openModal);

    closeModal.addEventListener("click",closeModalFn);

    cancelEvent.addEventListener("click",closeModalFn);

    eventModal.addEventListener("click",(e)=>{

        if(e.target===eventModal){

            closeModalFn();

        }

    });

    function createTicketRow(){

        const row=document.createElement("div");

        row.className="ticket-row";

        row.innerHTML=`

            <input type="text" placeholder="Ticket Name">

            <input type="number" placeholder="Price">

            <input type="number" placeholder="Limit">

            <button type="button" class="delete-ticket">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        row.querySelector(".delete-ticket").onclick=()=>{

            row.remove();

        };

        ticketContainer.appendChild(row);

    }

    addTicketBtn.addEventListener("click",createTicketRow);

    createTicketRow();

    console.log("Events Module Initialized");

}
