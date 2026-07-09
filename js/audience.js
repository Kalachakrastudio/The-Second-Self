//==========================================
// THE SECOND SELF
// Audience Ticket Booking
//==========================================

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

        handler: function (response) {

            alert("Payment Successful!");

            console.log(response);

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

function updateSummary(){

    const ticketPrice =
    Number(document.getElementById("ticketType").value) || 0;

    const quantity =
    Number(document.getElementById("quantity").value) || 1;

    const total =
    ticketPrice * quantity;

    document.getElementById("price").textContent =
    "₹" + ticketPrice;

    document.getElementById("tickets").textContent =
    quantity;

    document.getElementById("totalAmount").textContent =
    "₹" + total;

}

document.getElementById("ticketType").addEventListener("change",updateSummary);

document.getElementById("quantity").addEventListener("input",updateSummary);

window.addEventListener("load",updateSummary);

function doPost(e) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const data = JSON.parse(e.postData.contents);

  const sheet = ss.getSheetByName(data.sheet);

  if (!sheet) {

    return ContentService
      .createTextOutput(JSON.stringify({
        result: "Sheet not found"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  }

  // Generate Ticket ID only for Bookings sheet
  let ticketId = "";

  if (data.sheet === "Bookings") {

    ticketId = "TSS" + String(sheet.getLastRow()).padStart(6, "0");

  }

  delete data.sheet;

  const values = [];

  // Add Ticket ID as first column only for bookings
  if (ticketId !== "") {

    values.push(ticketId);

  }

  for (const key in data) {

    values.push(data[key]);

  }

  values.push(new Date());

  sheet.appendRow(values);

  return ContentService
    .createTextOutput(JSON.stringify({

      result: "success",

      ticketId: ticketId

    }))
    .setMimeType(ContentService.MimeType.JSON);

}
