const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxdgDhEJnRSpGsqoRK-2-7WCRZfldseJ8m1l4ONXYIqoTsQ8ODKGWIO2PjvUzWylChu/exec";

let scanning = false;

let currentTicket = null;

let todayEvent = null;

let html5QrCode;

const loader =
document.getElementById("loader");

const ticketCard =
document.getElementById("ticketCard");
function showLoader(){

    loader.classList.add("show");

}

function hideLoader(){

    loader.classList.remove("show");

}
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

    switch(type){

        case "success":

            icon.innerHTML="✅";

            break;

        case "warning":

            icon.innerHTML="⚠️";

            break;

        default:

            icon.innerHTML="❌";

    }

    popup.classList.add("show");

    setTimeout(()=>{

        popup.classList.remove("show");

        scanning=false;

    },2500);

}
//=====================================
// START CAMERA
//=====================================

const html5QrCode = new Html5Qrcode("reader");

window.addEventListener("load", startScanner);

async function startScanner(){

    try{

        const cameras =
        await Html5Qrcode.getCameras();

        if(cameras.length===0){

            alert("No Camera Found");

            return;

        }

        let cameraId = cameras[0].id;

        // Prefer back camera
        cameras.forEach(cam=>{

            const label =
            cam.label.toLowerCase();

            if(
                label.includes("back") ||
                label.includes("rear") ||
                label.includes("environment")
            ){

                cameraId = cam.id;

            }

        });

        await html5QrCode.start(

            cameraId,

            {

                fps:10,

                qrbox:{
                    width:250,
                    height:250
                }

            },

            onScanSuccess

        );

        console.log("Scanner Started");

    }

    catch(error){

        console.log(error);

        alert("Unable to open camera.");

    }

}
function onScanSuccess(decodedText){

    if(scanning) return;

    scanning = true;

    showLoader();

    searchTicket(decodedText,true);

}
document
.getElementById("searchBtn")
.onclick=()=>{

    const value =
    document
    .getElementById("searchInput")
    .value
    .trim();

    if(value===""){

        alert("Enter Ticket ID or Mobile Number.");

        return;

    }

    showLoader();

    searchTicket(value,false);

};
async function searchTicket(value,isScan=false){

    ticketCard.style.display="none";

    try{

        let url;

        if(

            value.toUpperCase().startsWith("TSS")

        ){

            url =
            SCRIPT_URL +
            "?action=searchTicket&ticket=" +
            encodeURIComponent(value);

        }

        else{

            url =
            SCRIPT_URL +
            "?action=searchTicket&mobile=" +
            encodeURIComponent(value);

        }

        const response =
        await fetch(url);

        const data =
        await response.json();

        hideLoader();

        if(!data.found){

            showPopup(

                "error",

                "Ticket Not Found",

                "No ticket found."

            );

            return;

        }

        currentTicket = data;

        validateTicket(data,isScan);

    }

    catch(error){

        hideLoader();

        console.log(error);

    }

}
