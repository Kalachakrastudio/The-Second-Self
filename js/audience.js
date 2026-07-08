const scriptURL =
"https://script.google.com/macros/s/AKfycbyYfAywSQ0GMFdw4V7v61eit6P4-oHTfXRnHT5CG16-decsPhm80Pt-H7opgMnvn44-/exec";

const RAZORPAY_KEY =
"rzp_test_TB3dk6zMNTlX6l";

const form =
document.getElementById("ticketForm");

const loadingPopup =
document.getElementById("loadingPopup");

const successPopup =
document.getElementById("successPopup");

const errorPopup =
document.getElementById("errorPopup");

form.addEventListener("submit",function(e){

    e.preventDefault();

    const amount =
    getTotalAmount();

    const options={

        key:RAZORPAY_KEY,

        amount:amount*100,

        currency:"INR",

        name:"The Second Self",

        description:"Audience Ticket",

        image:"../Image/favicon.png",

        theme:{
            color:"#D71F28"
        },

        prefill:{

            name:form.name.value,

            email:form.email.value,

            contact:form.mobile.value

        },

        handler:function(response){

            saveBooking(
                response.razorpay_payment_id
            );

        }

    };

    const rzp =
    new Razorpay(options);
rzp.on("payment.failed", function(){

    errorPopup.classList.add("show");

});
    
    rzp.open();

});

function saveBooking(paymentID){

    loadingPopup.classList.add("show");

    const data={

        sheet:"Bookings",

        paymentId:paymentID,

        name:form.name.value,

        mobile:form.mobile.value,

        email:form.email.value,

        event:form.eventDate.value,

        ticketType:
        document.getElementById("ticketType")
        .selectedOptions[0].text,

        quantity:
        document.getElementById("quantity").value,

        amount:
        getTotalAmount(),

        message:
        form.message.value

    };

  fetch(scriptURL,{

    method:"POST",

    headers:{
        "Content-Type":"application/json"
    },

    body:JSON.stringify(data)

})

    .then(res=>res.json())

.then(data=>{

    console.log(data);

    loadingPopup.classList.remove("show");

    successPopup.classList.add("show");
     form.reset();

    document.getElementById("quantity").value = 1;
updateSummary();

})

    .catch(error=>{

        console.log(error);

        loadingPopup.classList.remove("show");

        errorPopup.classList.add("show");

    });

}
document
.getElementById("closePopup")
.addEventListener("click",function(){

    successPopup.classList.remove("show");

});

document
.getElementById("closeErrorPopup")
.addEventListener("click",function(){

    errorPopup.classList.remove("show");

});

window.addEventListener("click",function(e){

    if(e.target===successPopup){

        successPopup.classList.remove("show");

    }

    if(e.target===errorPopup){

        errorPopup.classList.remove("show");

    }

});
function getTotalAmount(){

    const ticketPrice =
    Number(document.getElementById("ticketType").value);

    const quantity =
    Number(document.getElementById("quantity").value);

    return ticketPrice*quantity;

}
function updateSummary(){

    const ticketPrice =
    Number(document.getElementById("ticketType").value);

    const quantity =
    Number(document.getElementById("quantity").value);

    const total =
    ticketPrice * quantity;

    document.getElementById("price").innerText =
    "₹" + ticketPrice;

    document.getElementById("tickets").innerText =
    quantity;

    document.getElementById("totalAmount").innerText =
    "₹" + total;

}

document.getElementById("ticketType").addEventListener("change", updateSummary);

document.getElementById("quantity").addEventListener("input", updateSummary);

updateSummary();
