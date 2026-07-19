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


window.viewParticipant = function(rowId){

    selectedParticipant = participants.find(
        p => p.rowId == rowId
    );

    document.getElementById("participantDetails").innerHTML = `

        <div class="detail-grid">

            <div class="detail-item">
                <label>Name</label>
                <span>${selectedParticipant.Name || "-"}</span>
            </div>

            <div class="detail-item">
                <label>Age</label>
                <span>${selectedParticipant.Age || "-"}</span>
            </div>

            <div class="detail-item">
                <label>Gender</label>
                <span>${selectedParticipant.Gender || "-"}</span>
            </div>

            <div class="detail-item">
                <label>Mobile</label>
                <span>${selectedParticipant.Mobile || "-"}</span>
            </div>

            <div class="detail-item">
                <label>Email</label>
                <span>${selectedParticipant.Email || "-"}</span>
            </div>

            <div class="detail-item">
                <label>Profession</label>
                <span>${selectedParticipant.Profession || "-"}</span>
            </div>

            <div class="detail-item">
                <label>City</label>
                <span>${selectedParticipant.City || "-"}</span>
            </div>

            <div class="detail-item">
                <label>State</label>
                <span>${selectedParticipant.State || "-"}</span>
            </div>

            <div class="detail-item">
                <label>Category</label>
                <span>${selectedParticipant.Category || "-"}</span>
            </div>

            <div class="detail-item">
                <label>Performance Title</label>
                <span>${selectedParticipant.Title || "-"}</span>
            </div>

            <div class="detail-item">
                <label>Language</label>
                <span>${selectedParticipant.Language || "-"}</span>
            </div>

            <div class="detail-item">
                <label>Duration</label>
                <span>${selectedParticipant.Duration || "-"}</span>
            </div>

        </div>

        <div class="detail-block">

            <label>Story</label>

            <p>${selectedParticipant.Story || "-"}</p>

        </div>

        <div class="detail-grid">

            <div class="detail-item">
                <label>Instagram</label>
                <span>${selectedParticipant.Instagram || "-"}</span>
            </div>

            <div class="detail-item">
                <label>YouTube</label>
                <span>${selectedParticipant.YouTube || "-"}</span>
            </div>

            <div class="detail-item">
                <label>Website</label>
                <span>${selectedParticipant.Website || "-"}</span>
            </div>

            <div class="detail-item">
                <label>Video Link</label>
                <span>${selectedParticipant["Video Link"] || "-"}</span>
            </div>

        </div>

    `;

    document
        .getElementById("participantModal")
        .classList.add("show");

}


loadParticipants();



}
