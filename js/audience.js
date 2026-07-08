const ticketType = document.getElementById("ticketType");
const quantity = document.getElementById("quantity");

const price = document.getElementById("price");
const tickets = document.getElementById("tickets");
const totalAmount = document.getElementById("totalAmount");

function calculateTotal(){

    const rate = Number(ticketType.value);
    const qty = Number(quantity.value);

    if(!rate){

        price.textContent = "₹0";
        tickets.textContent = "0";
        totalAmount.textContent = "₹0";

        return;

    }

    price.textContent = "₹" + rate;
    tickets.textContent = qty;
    totalAmount.textContent = "₹" + (rate * qty);

}

ticketType.addEventListener("change", calculateTotal);
quantity.addEventListener("input", calculateTotal);

calculateTotal();


const form = document.getElementById("ticketForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    var options = {

        key: "rzp_test_TB3dk6zMNTlX6l",

        amount: 20000,

        currency: "INR",

        name: "The Second Self",

        description: "Audience Ticket",

        theme: {
            color: "#D71F28"
        }

    };

    var rzp = new Razorpay(options);

    rzp.open();

});
