console.log("Scanner JS Loaded");
const loader = document.getElementById("loader");

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
const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbx-8rFhi6qMHq_amT9n-2vceBX6G-ot32tXbD-f2WSyKFGLWLE9e3ehF1VHprrmcu8u/exec";

const reader = document.getElementById("reader");

console.log(loader);
console.log(reader);

const html5QrCode = new Html5Qrcode("reader");


//=====================================
// Open Camera
//=====================================

Html5Qrcode.getCameras()
.then(cameras => {

    console.log(cameras);

    if(cameras.length === 0){
        alert("No Camera Found");
        return;
    }

    let cameraId = cameras[0].id;

    for(const cam of cameras){

        console.log(cam.label);

        const label = cam.label.toLowerCase();

        if(
            label.includes("back") ||
            label.includes("rear") ||
            label.includes("environment")
        ){
            cameraId = cam.id;
            break;
        }
    }

    console.log("Using Camera:",cameraId);

    return html5QrCode.start(
        cameraId,
        {
            fps:10,
            qrbox:250
        },
        onScanSuccess
    );

})
.catch(err=>{
    console.error("Camera Error",err);
});

//=====================================
// QR Scan Success
//=====================================

let scanning = false;

function onScanSuccess(decodedText){

    if(scanning) return;

    scanning = true;

    showLoader();

    searchTicket(decodedText, true);

}

//=====================================
// Manual Search
//=====================================

document.getElementById("searchBtn").addEventListener("click",()=>{

    const value =
    document.getElementById("searchInput").value;

    showLoader();

searchTicket(value);

});

//=====================================
// Search Ticket
//=====================================

function searchTicket(value,isScan=false){

    value = value.trim();

    let url;

    if(value.toUpperCase().startsWith("TSS")){

        url =
        SCRIPT_URL +
        "?ticket=" +
        encodeURIComponent(value);

    }else{

        url =
        SCRIPT_URL +
        "?mobile=" +
        encodeURIComponent(value);

    }

fetch(url)

.then(res=>res.json())

.then(data=>{

    console.log("SEARCH RESPONSE");

    console.log(data);

    showTicket(data,isScan);

})

.catch(err=>{

    hideLoader();

    console.log(err);

});
}
//=====================================
// Show Ticket
//=====================================

function showTicket(data,isScan){

    //==========================
    // Ticket Not Found
    //==========================

    if(!data.found){

        showPopup(
            "error",
            "Ticket Not Found",
            "No ticket exists with this ID or Mobile Number."
        );

        scanning=false;

        return;

    }

    //==========================
    // QR Scan
    //==========================

    if(isScan){

        autoCheckIn(data.ticketId);

        return;

    }

    const ticketCard =
    document.getElementById("ticketCard");

    ticketCard.style.display="block";
    hideLoader();

    //==========================
    // Multiple Tickets
    //==========================

    if(data.multiple){

        let html="";

        data.tickets.forEach(ticket=>{

            html += `

            <div class="ticket-item">

                <p><b>Ticket ID :</b> ${ticket.ticketId}</p>

                <p><b>Name :</b> ${ticket.name}</p>

                <p><b>Event :</b> ${ticket.event}</p>

                <p><b>Status :</b> ${ticket.status}</p>

                <button
                onclick="manualCheckIn('${ticket.ticketId}')">

                    Check In

                </button>

                <hr>

            </div>

            `;

        });

        ticketCard.innerHTML = html;

        return;

    }

    //==========================
    // Single Ticket
    //==========================

    ticketCard.innerHTML = `

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
        onclick="manualCheckIn('${data.ticketId}')">

            Mark As Check In

        </button>

    `;

}

function manualCheckIn(ticketId){

    showLoader();

    fetch(SCRIPT_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"checkin",

            ticketId:ticketId

        })

    })

    .then(res=>res.json())

    .then(data=>{

        hideLoader();

        if(data.success){

            showPopup(
                "success",
                "Checked In",
                data.ticketId + "<br><br>" + data.checkInTime
            );

        }

        else if(data.alreadyChecked){

          showPopup(
                    "warning",
                    "Already Checked In",
                    data.name +
                    "<br><br>" +
                    data.ticketId +
                    "<br><br>" +
                    data.checkInTime
                );

        }

        else{

            showPopup(
                    "error",
                    "Invalid Ticket",
                    "This ticket is not valid."
                );

        }

    });

}

function autoCheckIn(ticketId){

showLoader();

fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify({

action:"checkin",

ticketId:ticketId

})

})
.then(res=>res.json())
.then(data=>{
    
hideLoader();

if(data.success){

showPopup(
    "success",
    "Ticket Valid",
    data.name +
    "<br><br>" +
    data.ticketId +
    "<br><br>" +
    data.checkInTime
);

}
else if(data.alreadyChecked){

showPopup(

"warning",

"Already Checked In",

ticketId

);

}
else{

showPopup(

"error",

"Invalid Ticket",

ticketId

);

}

scanning=false;

})
.catch(()=>{
hideLoader();
scanning=false;

});

}
//=====================================
// Check In
//=====================================



//=====================================
// Popup
//=====================================
function showPopup(type,title,message){

const popup =
document.getElementById("resultPopup");

const icon =
document.getElementById("popupIcon");

const heading =
document.getElementById("popupTitle");

const body =
document.getElementById("popupMessage");

heading.textContent = title;

body.innerHTML = message;

if(type=="success"){

icon.innerHTML="✅";

}

else if(type=="warning"){

icon.innerHTML="⚠";

}

else{

icon.innerHTML="❌";

}

popup.classList.add("show");

setTimeout(()=>{

popup.classList.remove("show");

scanning = false;

},2000);
}
