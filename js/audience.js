//==========================================
// THE SECOND SELF
// Audience Ticket Booking
//==========================================
const scriptURL =
"https://script.google.com/macros/s/AKfycbxO6YW1ZUZvX0Y2JnASsvIzZGIEyY2Vj3h1q-YLxn8h-iWzPze29Tw8NtWRJ_HJTKy6/exec";

// Replace this with your Razorpay Test Key
const RAZORPAY_KEY = "rzp_test_TB3dk6zMNTlX6l";

const form = document.getElementById("ticketForm");

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

    saveBooking(response.razorpay_payment_id);

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

 .then(data => {

    console.log(data);

    alert("Booking Saved Successfully");

    console.log("Ticket ID:", data.ticketId);

    form.reset();

    document.getElementById("quantity").value = 1;

    updateSummary();

})

    .catch(error => {

        console.error(error);

        alert("Error Saving Booking");

    });

}
