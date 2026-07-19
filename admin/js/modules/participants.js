function initParticipants(){
    console.log("Participants page initialized");

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxCxfx2-a1Mj9fsSBobGHXQ2WEMM4FgDa8KOvu05TkKvRhJnRmbkuWFJJiRDRUtk3Cc/exec";



let participants=[];

let selectedParticipant=null;



const table =
document.getElementById("participantTable");



async function loadParticipants(){

    console.log("Loading participants...");

    try{

        console.log("Before Fetch");

        const response = await fetch(
            SCRIPT_URL + "?action=getPerformers"
        );

        console.log("After Fetch");

        const result = await response.json();

console.log(result);

if(result.success){

    participants = result.performers;

    console.log(participants);

    renderParticipants(participants);

}

    }
    catch(err){

        console.error("Fetch Error:", err);

    }

}
function renderParticipants(data){

    table.innerHTML = "";

    if(data.length === 0){

        table.innerHTML = `
        <tr>
            <td colspan="6" class="empty-row">
                <i class="fa-solid fa-users"></i>
                <p>No Participants Found</p>
                <small>New performer registrations will appear here.</small>
            </td>
        </tr>`;
        console.log(table.innerHTML);
        return;
    }

    data.forEach(p=>{

        table.innerHTML += `
       <tr>

    <td>${p.Name}</td>

    <td>${p.Category}</td>

    <td>${p.City}</td>

    <td>
        <span class="status upcoming">
            Pending
        </span>
    </td>

    <td class="action-cell">

        <button
            class="action-btn"
            onclick="viewParticipant(${p.rowId})">

            <i class="fa-solid fa-eye"></i>

        </button>

    </td>

</tr>
    });

}


window.viewParticipant=function(rowId){


selectedParticipant =
participants.find(
p=>p.rowId==rowId
);



document.getElementById(
"participantDetails"
).innerHTML=`

<p><b>Name:</b>
${selectedParticipant.Name}
</p>


<p><b>Age:</b>
${selectedParticipant.Age}
</p>


<p><b>Category:</b>
${selectedParticipant.Category}
</p>


<p><b>Story:</b></p>

<p>
${selectedParticipant.Story}
</p>


`;



document
.getElementById("participantModal")
.classList.add("show");


}





document
.getElementById("closeParticipantModal")
.onclick=()=>{

document
.getElementById("participantModal")
.classList.remove("show");

};



loadParticipants();



}
