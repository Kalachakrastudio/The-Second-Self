//==========================================
// THE SECOND SELF
// Audience Ticket Booking
//==========================================
const successPopup =
document.getElementById("successPopup");

const scriptURL =
"https://script.google.com/macros/s/AKfycbxO6YW1ZUZvX0Y2JnASsvIzZGIEyY2Vj3h1q-YLxn8h-iWzPze29Tw8NtWRJ_HJTKy6/exec";

// Replace this with your Razorpay Test Key
const RAZORPAY_KEY = "rzp_test_TB3dk6zMNTlX6l";

const form = document.getElementById("ticketForm");
const loadingPopup =
document.getElementById("loadingPopup");

form.addEventListener("submit", function (e) {

    e.preventDefault();

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

window.onload = function () {

    updateSummary();

    document
        .getElementById("ticketType")
        .addEventListener("change", updateSummary);

    document
        .getElementById("quantity")
        .addEventListener("input", updateSummary);

};
function saveBooking(paymentId){

    const bookingData = {

        sheet: "Bookings",

        paymentId: paymentId,

        name: form.name.value,

        mobile: form.mobile.value,

        email: form.email.value,

        event: form.eventDate.value,

        ticketType: document.getElementById("ticketType").selectedOptions[0].text,

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
    console.log("Reached Here");

    console.log(data);
    
    console.log(typeof QRCode);
    
    console.log(QRCode);

    loadingPopup.classList.remove("show");

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

qrImage.src =
"https://chart.googleapis.com/chart?cht=qr&chs=220x220&chl=" +
encodeURIComponent(qrData);

qrImage.alt = "Ticket QR Code";

qrImage.style.width = "100%";
qrImage.style.height = "100%";
qrImage.style.display = "block";

qrBox.appendChild(qrImage);
    
    successPopup.classList.add("show");

    form.reset();

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

