const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwLxdU3EA4r_gyZL_m9ywaOBjH90wB6eeIDk_FWnKlqRwG12-hgjhJGl5qfdKFeJBDf/exec";
const html5QrCode =
new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(cameras=>{

if(cameras.length){

html5QrCode.start(

cameras[0].id,

{
fps:10,
qrbox:250
},

onScanSuccess

);

}

});

function onScanSuccess(decodedText){

html5QrCode.stop();

searchTicket(decodedText);

}


document
.getElementById("searchBtn")
.addEventListener("click",()=>{

const value =
document.getElementById("searchInput").value;

searchTicket(value);

});

function searchTicket(value){

fetch(

SCRIPT_URL+

"?action=search&q="+

encodeURIComponent(value)

)

.then(res=>res.json())

.then(showTicket);

}

function showTicket(data){

if(data.result!="success"){

alert("Ticket Not Found");

return;

}

document.getElementById("ticketCard").style.display="block";

document.getElementById("ticketId").textContent=data.ticketId;

document.getElementById("ticketName").textContent=data.name;

document.getElementById("ticketMobile").textContent=data.mobile;

document.getElementById("ticketEvent").textContent=data.event;

document.getElementById("ticketStatus").textContent=data.status;

}

document
.getElementById("checkInBtn")
.addEventListener("click",()=>{

fetch(

SCRIPT_URL+

"?action=checkin&id="+

document.getElementById("ticketId").textContent

)

.then(res=>res.json())

.then(data=>{

alert(data.message);

});

});
