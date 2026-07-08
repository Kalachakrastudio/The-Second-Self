const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", function(e){

    e.preventDefault();

    let amount =
    Number(document.getElementById("totalAmount").innerText);

    var options = {

        key:"rzp_test_xxxxxxxxx",

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
