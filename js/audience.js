//==========================================
// THE SECOND SELF
// Audience Ticket Booking
//==========================================
const successPopup =
document.getElementById("successPopup");

const scriptURL =
"https://script.google.com/macros/s/AKfycbw39NtS-1DLyJ_POoEFwrKhY73ptnprX41gAJEbYiCkTOXuESXGLwCbjNxouSSea08o/exec";

// Replace this with your Razorpay Test Key
const RAZORPAY_KEY = "rzp_test_TB3dk6zMNTlX6l";

const form = document.getElementById("ticketForm");
let events = [];
let selectedEvent = null;
const loadingPopup =
document.getElementById("loadingPopup");

form.addEventListener("submit", function (e) {

    e.preventDefault();
    const ticket =
document.getElementById("ticketType").selectedOptions[0];

if(ticket){

    const remaining =
    Number(ticket.dataset.limit);

    const qty =
    Number(document.getElementById("quantity").value);

    if(qty > remaining){

        alert(
            "Only " +
            remaining +
            " ticket(s) remaining."
        );

        return;

    }

}

    const amount = getTotalAmount();

    const options = {

        key: RAZORPAY_KEY,

        amount: amount * 100,

        currency: "INR",

        name: "The Second Self",

        description: "Audience Ticket",

        image: "../Image/favicon.png",

        theme: {
            color: "#D71F28"
        },

        prefill: {

            name: form.name.value,

            email: form.email.value,

            contact: form.mobile.value

        },

handler:function(response){

     window.currentPaymentId =
    response.razorpay_payment_id;

    loadingPopup.classList.add("show");

    saveBooking(window.currentPaymentId);

}

    };

    const rzp = new Razorpay(options);

    rzp.open();

});


//==============================
// Calculate Total Amount
//==============================

function getTotalAmount() {

    const ticketPrice = Number(document.getElementById("ticketType").value);

    const quantity = Number(document.getElementById("quantity").value);

    return ticketPrice * quantity;

}

function updateSummary() {

    const ticketType =
    document.getElementById("ticketType");

    const quantityInput =
    document.getElementById("quantity");

    const priceLabel =
    document.getElementById("price");

    const ticketLabel =
    document.getElementById("tickets");

    const totalLabel =
    document.getElementById("totalAmount");

  const ticketPrice =
Number(ticketType.value || 0);

const quantity =
Number(quantityInput.value || 1);

console.log(ticketType.value);
console.log(quantityInput.value);

const total =
ticketPrice * quantity;

console.log(total);
    
    priceLabel.textContent =
    "₹" + ticketPrice;

    ticketLabel.textContent =
    quantity;

    totalLabel.textContent =
    "₹" + total;

}
async function loadEvents(){

    try{

        console.log("Loading Events...");

        const response = await fetch(
            scriptURL + "?action=getAvailableEvents"
        );

        console.log(response);

        const result = await response.json();

        console.log(result);

        if(result.success){

            events = result.events;

            console.log(events);

            populateEventDropdown();

        }

    }
    catch(err){

        console.log(err);

    }

}
function populateEventDropdown(){

    console.log("populateEventDropdown Called");

    const eventSelect = document.getElementById("eventDate");

    eventSelect.innerHTML =
    `<option value="">Choose Event</option>`;

    events.forEach(event=>{

        eventSelect.innerHTML += `
            <option value="${event.id}">
                ${event.name} • ${event.city}
            </option>
        `;

    });

    rebuildCustomSelect("eventDate");

}
function populateTicketDropdown(event){

    const ticketSelect =
    document.getElementById("ticketType");

    ticketSelect.innerHTML =
    `<option value="">Select Ticket</option>`;

event.tickets.forEach(ticket=>{

    ticketSelect.innerHTML += `
        <option
            value="${ticket.price}"
            data-name="${ticket.name}"
            data-limit="${ticket.limit}">

            ${ticket.name} - ₹${ticket.price}

        </option>
    `;

});

    rebuildCustomSelect("ticketType");

    updateSummary();
const option = ticketSelect.selectedOptions[0];

if(option){

    document.getElementById("quantity").max =
    option.dataset.limit;

}
}
document.getElementById("eventDate").addEventListener("change", function(){

    const eventId = this.value;

    selectedEvent = events.find(event => event.id === eventId);

    if(!selectedEvent) return;

    populateTicketDropdown(selectedEvent);

});
window.onload = function () {

    loadEvents();

    updateSummary();

    document
    .getElementById("ticketType")
    .addEventListener("change", function () {

        const option = this.selectedOptions[0];

        if (option) {

            document.getElementById("quantity").max =
            option.dataset.limit;

        }
document.getElementById("quantity").value = 1;
        updateSummary();

    });
};
   document
.getElementById("quantity")
.addEventListener("input", function(){

    const ticket =
    document.getElementById("ticketType").selectedOptions[0];

    if(!ticket){
        updateSummary();
        return;
    }

    const remaining =
    Number(ticket.dataset.limit);

    const qty =
    Number(this.value);

    if(qty > remaining){

       alert(
    `Only ${remaining} ticket${remaining > 1 ? "s" : ""} left for this ticket type.`
);

        this.value = remaining;

    }

    updateSummary();

});
function saveBooking(paymentId){

    const bookingData = {

        sheet: "Bookings",

        paymentId: paymentId,

        name: form.name.value,

        mobile: form.mobile.value,

        email: form.email.value,

        eventId: selectedEvent.id,
        eventName: selectedEvent.name,

        ticketType:
selectedEvent.tickets[
document.getElementById("ticketType").selectedIndex - 1
].name,

        quantity: document.getElementById("quantity").value,

        amount: getTotalAmount(),

        message: form.message.value

    };

 fetch(scriptURL, {

    method: "POST",

    body: JSON.stringify(bookingData)

})

.then(response => response.json())

.then(data => {

 loadingPopup.classList.remove("show");

if(!data.success){

    if(data.soldOut){

        alert(
            "Only " +
            data.remaining +
            " ticket(s) are available."
        );

    }else{

        alert(data.message);

    }

    return;

}

    console.log(data);

    document.getElementById("ticketID").textContent =
    data.ticketId;

    document.getElementById("ticketEvent").textContent =
    form.eventDate.options[form.eventDate.selectedIndex].text;

    document.getElementById("ticketTypePopup").textContent =
    document.getElementById("ticketType").selectedOptions[0].text;

    document.getElementById("ticketQuantity").textContent =
    document.getElementById("quantity").value;
//==============================
// Generate QR Code
//==============================

const qrData = data.ticketId;

const qrBox = document.getElementById("qrCode");

qrBox.innerHTML = "";

const qrImage = document.createElement("img");

qrImage.src =qrImage.src =
"https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
encodeURIComponent(qrData);

qrImage.alt = "Ticket QR Code";

qrImage.style.width = "100%";
qrImage.style.height = "100%";
qrImage.style.display = "block";

qrBox.appendChild(qrImage);
    
    console.log("Popup Opening...");

    successPopup.classList.add("show");
    
    form.reset();

resetCustomSelect("eventDate");
resetCustomSelect("ticketType");

document.getElementById("quantity").value = 1;

updateSummary();

})

.catch(error=>{

    loadingPopup.classList.remove("show");

    console.log(error);

});

}
document
.getElementById("closePopup")
.addEventListener("click",function(){

    successPopup.classList.remove("show");

});
window.addEventListener("click",function(e){

    if(e.target===successPopup){

        successPopup.classList.remove("show");

    }

});
window.addEventListener("DOMContentLoaded", function () {

    document
        .getElementById("closePopup")
        .addEventListener("click", function () {

            successPopup.classList.remove("show");

        });

});

//==========================================
// Download Ticket
//==========================================

document.getElementById("downloadTicket").addEventListener("click", function () {

    console.log("Download Clicked");

    const ticket = document.getElementById("ticketToDownload");

    console.log(ticket);

    console.log(typeof html2canvas);

    html2canvas(ticket,{
        scale:2,
        useCORS:true
    }).then(function(canvas){

        console.log("Canvas Generated");

        const link = document.createElement("a");

        link.download =
        document.getElementById("ticketID").textContent + ".png";

        link.href = canvas.toDataURL();

        link.click();

    });

});
