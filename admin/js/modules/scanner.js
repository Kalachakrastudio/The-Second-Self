let html5QrCode = null;
let scanning = false;
let selectedEvent = "";
function initScanner(){

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxdgDhEJnRSpGsqoRK-2-7WCRZfldseJ8m1l4ONXYIqoTsQ8ODKGWIO2PjvUzWylChu/exec";

const eventSelect =
document.getElementById("scannerEvent");

const searchInput =
document.getElementById("scannerSearch");

const searchBtn =
document.getElementById("scannerSearchBtn");

const loader =
document.getElementById("scannerLoader");

const popup =
document.getElementById("scannerPopup");

const ticketCard =
document.getElementById("scannerTicket");

loadEvents();

searchBtn.onclick=function(){

searchTicket(
searchInput.value.trim(),
false
);

};

eventSelect.onchange=function(){

selectedEvent=this.value;

loadStatistics();

loadRecentCheckins();

};

}

function showLoader(){

document
.getElementById("scannerLoader")
.classList
.add("show");

}

function hideLoader(){

document
.getElementById("scannerLoader")
.classList
.remove("show");

}

function showPopup(type,title,message){

const popup =
document.getElementById("scannerPopup");

document.getElementById("popupTitle").innerHTML=title;

document.getElementById("popupMessage").innerHTML=message;

const icon=document.getElementById("popupIcon");

if(type=="success"){

icon.innerHTML="✅";

}

else if(type=="warning"){

icon.innerHTML="⚠️";

}

else{

icon.innerHTML="❌";

}

popup.classList.add("show");

setTimeout(()=>{

popup.classList.remove("show");
    scanning = false;

},2500);

}
async function loadEvents(){

showLoader();

try{

const res=await fetch(

SCRIPT_URL+
"?action=getScannerEvents"

);

const data=await res.json();

hideLoader();

if(!data.success){

showPopup(

"error",

"Error",

"Unable to load events."

);

return;

}

const select=document.getElementById("scannerEvent");

select.innerHTML="";

data.events.forEach(event=>{

select.innerHTML+=`

<option value="${event.id}">

${event.name}

</option>

`;

});

if(data.events.length===0){

    hideLoader();

    showPopup(
        "warning",
        "No Event",
        "No event available today."
    );

    return;

}

  selectedEvent = data.events[0].id;

document.getElementById("scannerEvent").value =
selectedEvent;

setTimeout(()=>{

    startCamera();

},300);

loadStatistics();

loadRecentCheckins();

}

catch(err){

hideLoader();

console.log(err);

}
}

async function startCamera(){

if(html5QrCode){

    try{

        await html5QrCode.stop();

        await html5QrCode.clear();

    }catch(e){}

}

if(!html5QrCode){

    html5QrCode = new Html5Qrcode("reader");

}

try{

const cameras=

await Html5Qrcode.getCameras();

if(cameras.length==0){

showPopup(

"error",

"No Camera",

"No camera detected."

);

return;

}

let camera=cameras[0].id;

for(const cam of cameras){

const label=

cam.label.toLowerCase();

if(

label.includes("back")||

label.includes("rear")||

label.includes("environment")

){

camera=cam.id;

break;

}

}

await html5QrCode.start(
    camera,
    {
        fps:10,
        qrbox:{
            width:250,
            height:250
        }
    },
    onScanSuccess
);

}

catch(err){

console.error(err);

showPopup(
    "error",
    "Camera Error",
    "Unable to access camera. Please allow camera permission and refresh the page."
);

}

}

function onScanSuccess(ticketId){

if(scanning) return;

scanning=true;

searchTicket(ticketId,true);

}
fetch(url)

.then(res=>res.json())

.then(data=>{

    hideLoader();

    showTicket(data,isScan);

    scanning = false;

})

.catch(err=>{

    hideLoader();

    scanning = false;

    console.log(err);

});
