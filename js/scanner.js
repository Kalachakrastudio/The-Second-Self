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
"https://script.google.com/macros/s/AKfycbzwdXH-g5S-FtPMh24QHj4y4_trvj9KM8DMzA5mgZpJL6WXHBCYm6DXsTB7de1KdcN0/exec";

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

    hideLoader();

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

    if(!data.found){

        if(isScan){

            showPopup(
                "error",
                "Invalid Ticket",
                "This ticket does not exist."
            );

            scanning = false;

            return;

        }

      showPopup(
    "error",
    "Ticket Not Found",
    "No ticket exists with this ID or mobile number."
);

        return;

    }

    if(isScan){

        autoCheckIn(data.ticketId);

        return;

    }

    document.getElementById("ticketCard").style.display="block";

    document.getElementById("ticketId").textContent=data.ticketId;

    document.getElementById("ticketName").textContent=data.name;

    document.getElementById("ticketMobile").textContent=data.mobile;

    document.getElementById("ticketEvent").textContent=data.event;

    document.getElementById("ticketStatus").textContent=data.status;

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

ticketId +

"<br><br>Checked In Successfully"

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

document.getElementById("checkInBtn").addEventListener("click",()=>{

    showLoader();
    fetch(SCRIPT_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"checkin",

            ticketId:
            document.getElementById("ticketId").textContent

        })

    })
    .then(res=>res.json())
  .then(data=>{

hideLoader();

console.log("CHECKIN RESPONSE");

console.log(data);
      
       if(data.success){

showPopup(
"success",
"Checked In",
"Ticket checked in successfully."
);

}
else if(data.alreadyChecked){

showPopup(
"warning",
"Already Checked In",
"This ticket has already been used."
);

}
else{

showPopup(
"error",
"Invalid Ticket",
"Ticket not found."
);

}
    });

});

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
