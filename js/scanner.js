const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxS4r7iNHtbIjfalJ7Iec8NyCQGmeuLmWrPzl6mP8b3ygWIJSBwCl6K13HkqjXEaxvn/exec";
const html5QrCode =
new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(cameras=>{

if(cameras.length){

html5QrCode.start(

let cameraId = cameras[0].id;

for(const cam of cameras){

    if(
        cam.label.toLowerCase().includes("back") ||
        cam.label.toLowerCase().includes("rear")
    ){

        cameraId = cam.id;

    }

}

html5QrCode.start(

cameraId,

{
    fps:10,
    qrbox:250
},

onScanSuccess

);

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

    value = value.trim();

    let url = "";

    // If it starts with TSS, search by Ticket ID
    if(value.toUpperCase().startsWith("TSS")){

        url =
        SCRIPT_URL +
        "?ticket=" +
        encodeURIComponent(value);

    }

    // Otherwise search by Mobile Number
    else{

        url =
        SCRIPT_URL +
        "?mobile=" +
        encodeURIComponent(value);

    }

    fetch(url)
    .then(res => res.json())
    .then(showTicket);

}

function showTicket(data){

    if(!data.found){

        alert("Ticket Not Found");

        return;

    }

    document.getElementById("ticketCard").style.display = "block";

    document.getElementById("ticketId").textContent = data.ticketId;

    document.getElementById("ticketName").textContent = data.name;

    document.getElementById("ticketMobile").textContent = data.mobile;

    document.getElementById("ticketEvent").textContent = data.event;

    document.getElementById("ticketStatus").textContent = data.status;

}

document.getElementById("checkInBtn").addEventListener("click",()=>{

fetch(SCRIPT_URL,{

    method:"POST",

    body:JSON.stringify({

        action:"checkin",

        ticketId:document.getElementById("ticketId").textContent

    })

})
.then(res=>res.json())
.then(data=>{

    if(data.success){

        alert("Checked In Successfully");

    }else{

        alert("Ticket Not Found");

    }

});

});
