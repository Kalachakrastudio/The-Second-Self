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
