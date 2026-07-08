const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", function(e){

    e.preventDefault();

    let amount =
    Number(document.getElementById("totalAmount").innerText);

    var options = {

        key:"rzp_test_TB3dk6zMNTlX6l",

        amount:amount*100,

        currency:"INR",

        name:"The Second Self",

        description:"Audience Ticket",

        image:"../Image/favicon.png",

        handler:function(response){

            saveBooking(response.razorpay_payment_id);

        }

    };

    var rzp = new Razorpay(options);

    rzp.open();

});
function saveBooking(paymentId){

const formData={

sheet:"Tickets",

paymentId:paymentId,

name:name.value,

mobile:mobile.value,

email:email.value,

ticketType:ticketType.value,

quantity:quantity.value,

amount:totalAmount.innerText

};

fetch(scriptURL,{

method:"POST",

body:JSON.stringify(formData)

})

.then(r=>r.json())

.then(data=>{

generateTicket(data.ticketId);

});

}
