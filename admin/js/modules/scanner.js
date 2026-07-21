/*=========================================
SCANNER
=========================================*/

const SCANNER_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzaDRnFwOBVrKI3KKofkOFCPC_ity7TGyRXkOixU6XifG-XEuPyzFIAlxKoo57ZAUtf/exec";

let html5QrCode = null;

let scanning = false;

let selectedEvent = "";

let scannerStarted = false;

let scannerEvents = [];

/*=========================================
DOM
=========================================*/
let eventSelect;
let searchInput;
let searchBtn;
let ticketCard;
let loader;
let popup;
let recentTable;
let reader;

  function showLoader(){

    if(loader){

        loader.classList.add("show");

    }

}


function hideLoader(){

    if(loader){

        loader.classList.remove("show");

    }

}
    function showPopup(type,title,message){

    if(!popup){
        console.error("Popup element missing");
        return;
    }

    popup.classList.add("show");

    document.getElementById("popupTitle").innerHTML = title;

    document.getElementById("popupMessage").innerHTML = message;

    const icon = document.getElementById("popupIcon");

    if(!icon) return;


    if(type=="success"){

        icon.innerHTML =
        '<i class="fa-solid fa-circle-check"></i>';

        icon.style.color="#00c853";

    }

    else if(type=="warning"){

        icon.innerHTML =
        '<i class="fa-solid fa-circle-exclamation"></i>';

        icon.style.color="#ffc107";

    }

    else{

        icon.innerHTML =
        '<i class="fa-solid fa-circle-xmark"></i>';

        icon.style.color="#ff5252";

    }

}

function initScanner(){

    eventSelect =
document.getElementById("scannerEvent");

searchInput =
document.getElementById("scannerSearch");

searchBtn =
document.getElementById("scannerSearchBtn");

ticketCard =
document.getElementById("scannerTicket");

loader =
document.getElementById("scannerLoader");

popup =
document.getElementById("scannerPopup");

recentTable =
document.getElementById("recentCheckins");

reader =
document.getElementById("reader");

/*=========================================
INIT
=========================================*/
if(
!eventSelect ||
!searchInput ||
!ticketCard ||
!loader ||
!popup ||
!reader
){

console.error("Scanner DOM missing");

return;

}
    loadEvents();

   if(searchBtn){

    searchBtn.onclick = ()=>{

        const value = searchInput.value.trim();

        if(value === ""){

            showPopup(
                "warning",
                "Search",
                "Enter Ticket ID or Mobile Number."
            );

            return;

        }

        searchTicket(value,false);

    };

}

if(searchInput){

    searchInput.addEventListener("keypress",e=>{

        if(e.key==="Enter" && searchBtn){

            searchBtn.click();

        }

    });

}

  if(eventSelect){

    eventSelect.onchange = function(){

        selectedEvent = this.value;

        loadStatistics();

        loadRecentCheckins();

    };

}
}
/*=========================================
LOAD EVENTS
=========================================*/

async function loadEvents(){

    showLoader();

    try{

        const response = await fetch(

            SCANNER_SCRIPT_URL +
            "?action=getScannerEvents"

        );

        const result = await response.json();

        hideLoader();

        if(!result.success){

            showPopup(
                "error",
                "Unable to Load",
                "Couldn't load today's events."
            );

            return;

        }

        scannerEvents = result.events || [];

        eventSelect.innerHTML = "";

        if(scannerEvents.length === 0){

            eventSelect.innerHTML = `
                <option value="">
                    No Active Event
                </option>
            `;

            rebuildCustomSelect("scannerEvent");

            showPopup(
                "warning",
                "No Event",
                "There is no active event available for today."
            );

            return;

        }

        scannerEvents.forEach(event=>{

            eventSelect.innerHTML += `

                <option value="${event.id}">

                    ${event.name}

                </option>

            `;

        });

        selectedEvent = scannerEvents[0].id;

        eventSelect.value = selectedEvent;

      rebuildCustomSelect("scannerEvent");


if(!scannerStarted){

    scannerStarted=true;

    setTimeout(()=>{

        startCamera();

    },500);

}
        loadStatistics();

        loadRecentCheckins();

    }

    catch(err){

        hideLoader();

        console.error(err);

        showPopup(
            "error",
            "Connection Error",
            "Unable to connect with server."
        );

    }

}
/*=========================================
START CAMERA
=========================================*/

async function startCamera(){

    try{

        // Stop previous scanner if running
        if(html5QrCode){

            try{

                await html5QrCode.stop();
                await html5QrCode.clear();

            }

            catch(e){}

        }

        html5QrCode = new Html5Qrcode("reader");

        const cameras = await Html5Qrcode.getCameras();

        if(cameras.length===0){

            showPopup(
                "error",
                "Camera Not Found",
                "No camera was detected on this device."
            );

            return;

        }

        let cameraId = cameras[0].id;

        // Prefer Back Camera

        cameras.forEach(camera=>{

            const label = camera.label.toLowerCase();

            if(

                label.includes("back") ||

                label.includes("rear") ||

                label.includes("environment")

            ){

                cameraId = camera.id;

            }

        });

        await html5QrCode.start(

            cameraId,

            {

                fps:10,

                qrbox:{
                    width:250,
                    height:250
                },

                aspectRatio:1

            },

            onScanSuccess,

            ()=>{}

        );

    }

    catch(err){

        console.error(err);

        showPopup(

            "error",

            "Camera Error",

            "Unable to access camera. Please allow camera permission."

        );

    }

}

/*=========================================
SCAN SUCCESS
=========================================*/

function onScanSuccess(decodedText){

    if(scanning) return;

    scanning = true;

    showLoader();

    searchTicket(decodedText,true);

}
/*=========================================
SEARCH TICKET
=========================================*/

async function searchTicket(value,isScan=false){

    if(value==""){

        showPopup(
            "warning",
            "Empty Search",
            "Please enter Ticket ID or Mobile Number."
        );

        scanning=false;

        return;

    }

    showLoader();

    let url =
    SCANNER_SCRIPT_URL +
    "?action=searchTicket" +
    "&eventId=" + encodeURIComponent(selectedEvent);

    value=value.trim();

    if(value.toUpperCase().startsWith("TSS")){

        url +=
        "&ticket=" +
        encodeURIComponent(value);

    }

    else{

        url +=
        "&mobile=" +
        encodeURIComponent(value);

    }

    try{

        const response = await fetch(url);

        const data = await response.json();

        hideLoader();

        showTicket(data,isScan);

    }

    catch(err){

        hideLoader();

        scanning=false;

        console.error(err);

        showPopup(
            "error",
            "Connection Error",
            "Unable to connect with server."
        );

    }

}
/*=========================================
SHOW TICKET
=========================================*/

function showTicket(data,isScan=false){

    hideLoader();

    if(!isScan){

        scanning=false;

    }

    //==========================
    // Ticket Not Found
    //==========================

    if(!data.found){

        showPopup(
            "error",
            "Ticket Not Found",
            "No ticket found."
        );

        return;

    }

    //==========================
    // Wrong Event
    //==========================

    if(data.invalidEvent){

        showPopup(

            "warning",

            "Invalid Ticket",

            `

            This ticket belongs to

            <br><br>

            <b>${data.event}</b>

            <br><br>

            Event Date :

            <b>${data.eventDate}</b>

            `

        );

        return;

    }

    //==========================
    // Old Ticket
    //==========================

    if(data.expired){

        showPopup(

            "warning",

            "Old Ticket",

            `

            This ticket belongs to

            <br><br>

            <b>${data.event}</b>

            <br><br>

            Event Date :

            <b>${data.eventDate}</b>

            <br><br>

            Ticket can't be used today.

            `

        );

        return;

    }

    //==========================
    // QR Scan
    //==========================

    if(isScan){

        autoCheckIn(data.ticketId);

        return;

    }

    //==========================
    // Multiple Tickets
    //==========================

    if(data.multiple){

        ticketCard.style.display="block";

        let html="";

        data.tickets.forEach(ticket=>{

            html += `

            <div class="ticket-item">

                <h4>${ticket.name}</h4>

                <p>${ticket.ticketId}</p>

                <p>${ticket.event}</p>

                <p>${ticket.status}</p>

                <button
                onclick='manualCheckIn("${ticket.ticketId}")'>

                    Check In

                </button>

            </div>

            `;

        });

        ticketCard.innerHTML=html;

        return;

    }

    //==========================
    // Single Ticket
    //==========================

    ticketCard.style.display="block";

    ticketCard.innerHTML=`

        <h3>Ticket Details</h3>

        <table>

            <tr>

                <td>Ticket ID</td>

                <td>${data.ticketId}</td>

            </tr>

            <tr>

                <td>Name</td>

                <td>${data.name}</td>

            </tr>

            <tr>

                <td>Mobile</td>

                <td>${data.mobile}</td>

            </tr>

            <tr>

                <td>Event</td>

                <td>${data.event}</td>

            </tr>

            <tr>

                <td>Status</td>

                <td>${data.status}</td>

            </tr>

        </table>

        <button
        onclick='manualCheckIn("${data.ticketId}")'>

            Mark As Check-In

        </button>

    `;

}
/*=========================================
MANUAL CHECK IN
=========================================*/

async function manualCheckIn(ticketId){

    showLoader();

    try{

        const response = await fetch(

            SCANNER_SCRIPT_URL,

            {

                method:"POST",

                headers:{
                    "Content-Type":"text/plain;charset=utf-8"
                },

                body:JSON.stringify({

                    action:"checkIn",

                    ticketId:ticketId,

                    eventId:selectedEvent

                })

            }

        );

        const data = await response.json();

        hideLoader();

        processCheckInResponse(data);

    }

    catch(err){

        hideLoader();

        console.error(err);

        showPopup(
            "error",
            "Connection Error",
            "Unable to connect with server."
        );

    }

}
/*=========================================
AUTO CHECK IN
=========================================*/

async function autoCheckIn(ticketId){

    showLoader();

    try{

        const response = await fetch(

            SCANNER_SCRIPT_URL,

            {

                method:"POST",

                headers:{
                    "Content-Type":"text/plain;charset=utf-8"
                },

                body:JSON.stringify({

                    action:"checkIn",

                    ticketId:ticketId,

                    eventId:selectedEvent

                })

            }

        );

        const data = await response.json();

        hideLoader();

        processCheckInResponse(data);

    }

    catch(err){

        hideLoader();

        console.error(err);

        showPopup(
            "error",
            "Connection Error",
            "Unable to connect with server."
        );

    }

}

/*=========================================
PROCESS CHECK IN RESPONSE
=========================================*/

function processCheckInResponse(data){

    setTimeout(()=>{

    scanning=false;

},2000);

    // Ticket checked successfully

    if(data.success){

        showPopup(

            "success",

            "Check-In Successful",

            `

            <b>${data.name}</b>

            <br><br>

            ${data.ticketId}

            <br><br>

            ${data.checkInTime}

            `

        );

        loadStatistics();

        loadRecentCheckins();

        ticketCard.style.display="none";

        return;

    }

    // Already checked

    if(data.alreadyChecked){

        showPopup(

            "warning",

            "Already Checked In",

            `

            <b>${data.name}</b>

            <br><br>

            ${data.ticketId}

            <br><br>

            ${data.checkInTime}

            `

        );

        return;

    }

    // Wrong Event

    if(data.invalidEvent){

        showPopup(

            "warning",

            "Invalid Ticket",

            `

            This ticket belongs to

            <br><br>

            <b>${data.event}</b>

            <br><br>

            Event Date

            <br>

            ${data.eventDate}

            `

        );

        return;

    }

    // Old Event

    if(data.expired){

        showPopup(

            "warning",

            "Old Event Ticket",

            `

            ${data.event}

            <br><br>

            ${data.eventDate}

            <br><br>

            Ticket cannot be used today.

            `

        );

        return;

    }

    // Invalid Ticket

    showPopup(

        "error",

        "Invalid Ticket",

        "This ticket is not valid."

    );

}
/*=========================================
LOAD STATISTICS
=========================================*/

async function loadStatistics(){

    if(!selectedEvent) return;

    try{

        const response = await fetch(

            SCANNER_SCRIPT_URL +

            "?action=getScannerStats" +

            "&eventId=" + encodeURIComponent(selectedEvent)

        );

        const data = await response.json();

        if(!data.success) return;

        document.getElementById("statTotal").textContent =
        data.totalTickets;

        document.getElementById("statChecked").textContent =
        data.checkedIn;

        document.getElementById("statPending").textContent =
        data.pending;

        document.getElementById("statRevenue").textContent =
        "₹" + Number(data.revenue).toLocaleString("en-IN");

    }

    catch(err){

        console.error(err);

    }

}
/*=========================================
RECENT CHECK INS
=========================================*/

async function loadRecentCheckins(){

    if(!selectedEvent) return;

    try{

        const response = await fetch(

            SCANNER_SCRIPT_URL +

            "?action=getRecentCheckins" +

            "&eventId=" + encodeURIComponent(selectedEvent)

        );

        const data = await response.json();

        if(!data.success) return;

        const table =
        document.getElementById("recentCheckins");

        table.innerHTML = "";

        if(data.checkins.length===0){

            table.innerHTML=`

            <tr>

                <td colspan="4" class="empty-row">

                    No Check-ins Yet

                </td>

            </tr>

            `;

            return;

        }

        data.checkins.forEach(item=>{

            table.innerHTML += `

                <tr>

                    <td>${item.time}</td>

                    <td>${item.ticketId}</td>

                    <td>${item.name}</td>

                    <td>

                        <span class="status success">

                            Checked In

                        </span>

                    </td>

                </tr>

            `;

        });

    }

    catch(err){

        console.error(err);

    }

}
/*=========================================
REFRESH DASHBOARD
=========================================*/

function refreshDashboard(){

    loadStatistics();

    loadRecentCheckins();

}
/*=========================================
CLEAR TICKET
=========================================*/

function clearTicket(){

    ticketCard.style.display="none";

    ticketCard.innerHTML="";
}

console.log("SCANNER JS LOADED");
