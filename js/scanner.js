const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxS4r7iNHtbIjfalJ7Iec8NyCQGmeuLmWrPzl6mP8b3ygWIJSBwCl6K13HkqjXEaxvn/exec";

const html5QrCode = new Html5Qrcode("reader");

//=====================================
// Open Camera
//=====================================

Html5Qrcode.getCameras().then(cameras=>{

    if(!cameras.length){

        alert("No Camera Found");

        return;

    }

    let cameraId = cameras[0].id;

    // Prefer Back Camera
    for(const cam of cameras){

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

    html5QrCode.start(

        cameraId,

        {
            fps:10,
            qrbox:250
        },

        onScanSuccess

    );

});

//=====================================
// QR Scan Success
//=====================================

function onScanSuccess(decodedText){

    html5QrCode.stop();

    searchTicket(decodedText);

}

//=====================================
// Manual Search
//=====================================

document.getElementById("searchBtn").addEventListener("click",()=>{

    const value =
    document.getElementById("searchInput").value;

    searchTicket(value);

});

//=====================================
// Search Ticket
//=====================================

function searchTicket(value){

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
    .then(showTicket);

}

//=====================================
// Show Ticket
//=====================================

function showTicket(data){

    if(!data.found){

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

//=====================================
// Check In
//=====================================

document.getElementById("checkInBtn").addEventListener("click",()=>{

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

        if(data.success){

            alert("Checked In Successfully");

        }else{

            alert("Ticket Not Found");

        }

    });

});
