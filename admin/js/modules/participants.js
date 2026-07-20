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

    populateCategoryFilter();

    applyFilters();

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

   data.forEach(p => {

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
    `;

});   // <-- closes forEach

}      // <-- closes renderParticipants
function populateCategoryFilter(){

    const categoryFilter =
    document.getElementById("participantCategoryFilter");

    categoryFilter.innerHTML =
    `<option value="all">All Categories</option>`;

    const categories = [];

    participants.forEach(p=>{

        if(
            p.Category &&
            !categories.includes(p.Category)
        ){

            categories.push(p.Category);

        }

    });

    categories.sort();

    categories.forEach(category=>{

        categoryFilter.innerHTML += `
            <option value="${category}">
                ${category}
            </option>
        `;

    });

}
    function applyFilters(){

    const search =
    document.getElementById("participantSearch")
    .value
    .toLowerCase();

    const category =
    document.getElementById("participantCategoryFilter")
    .value;

    const filtered = participants.filter(p=>{

        const matchSearch =
        (p.Name || "")
        .toLowerCase()
        .includes(search);

        const matchCategory =
        category=="all" ||
        p.Category==category;

        return matchSearch && matchCategory;

    });

    renderParticipants(filtered);

}

window.viewParticipant = function(rowId){

    selectedParticipant = participants.find(
        p => p.rowId == rowId
    );
console.log("Selected Participant");
console.log(selectedParticipant);
    document.getElementById("participantDetails").innerHTML = `

        <div class="info-row">
            <div class="info-label">Name</div>
            <div class="info-value">${selectedParticipant.Name || "-"}</div>
        </div>

        <div class="info-row">
            <div class="info-label">Age</div>
            <div class="info-value">${selectedParticipant.Age || "-"}</div>
        </div>

        <div class="info-row">
            <div class="info-label">Gender</div>
            <div class="info-value">${selectedParticipant.Gender || "-"}</div>
        </div>

        <div class="info-row">
            <div class="info-label">Mobile</div>
            <div class="info-value">${selectedParticipant.Mobile || "-"}</div>
        </div>

        <div class="info-row">
            <div class="info-label">Email</div>
            <div class="info-value">${selectedParticipant.Email || "-"}</div>
        </div>

        <div class="info-row">
            <div class="info-label">Profession</div>
            <div class="info-value">${selectedParticipant.Profession || "-"}</div>
        </div>

        <div class="info-row">
            <div class="info-label">City</div>
            <div class="info-value">${selectedParticipant.City || "-"}</div>
        </div>

        <div class="info-row">
            <div class="info-label">State</div>
            <div class="info-value">${selectedParticipant.State || "-"}</div>
        </div>

        <div class="info-row">
            <div class="info-label">Category</div>
            <div class="info-value">${selectedParticipant.Category || "-"}</div>
        </div>

        <div class="info-row">
            <div class="info-label">Performance Title</div>
            <div class="info-value">${selectedParticipant.Title || "-"}</div>
        </div>

        <div class="info-row">
            <div class="info-label">Language</div>
            <div class="info-value">${selectedParticipant.Language || "-"}</div>
        </div>

        <div class="info-row">
            <div class="info-label">Duration</div>
            <div class="info-value">${selectedParticipant.Duration || "-"}</div>
        </div>

        <div class="story-box">

            <h3>Story</h3>

            <p>${selectedParticipant.Story || "-"}</p>

        </div>

        <div class="info-row">
            <div class="info-label">Instagram</div>

            <div class="info-value">

                ${
                    selectedParticipant.Instagram

                    ? `<a href="${selectedParticipant.Instagram}" target="_blank" class="profile-link">Open Instagram</a>`

                    : "-"
                }

            </div>
        </div>

        <div class="info-row">
            <div class="info-label">YouTube</div>

            <div class="info-value">

                ${
                    selectedParticipant.YouTube

                    ? `<a href="${selectedParticipant.YouTube}" target="_blank" class="profile-link">Open YouTube</a>`

                    : "-"
                }

            </div>
        </div>

        <div class="info-row">
            <div class="info-label">Website</div>

            <div class="info-value">

                ${
                    selectedParticipant.Website

                    ? `<a href="${selectedParticipant.Website}" target="_blank" class="profile-link">Visit Website</a>`

                    : "-"
                }

            </div>
        </div>

        <div class="info-row">
            <div class="info-label">Performance Video</div>

            <div class="info-value">

                ${
                    selectedParticipant["Video Link"]

                    ? `<a href="${selectedParticipant["Video Link"]}" target="_blank" class="profile-link">Watch Video</a>`

                    : "-"
                }

            </div>
        </div>

    `;

    document
    .getElementById("participantModal")
    .classList.add("show");

}


document
.getElementById("closeParticipantModal")
.onclick = () => {

    document
    .getElementById("participantModal")
    .classList.remove("show");

};

    async function updatePerformer(action){

    if(!selectedParticipant){

        alert("No participant selected.");

        return;

    }

    console.log("Sending:", action);
    console.log(selectedParticipant);

    try{

        const response = await fetch(SCRIPT_URL,{

            method:"POST",

            body:JSON.stringify({

                action:action,

                rowId:selectedParticipant.rowId,

                eventId:""

            })

        });

        const result = await response.json();

        console.log(result);

        if(result.success){

            alert(result.message);

            document
            .getElementById("participantModal")
            .classList.remove("show");

            loadParticipants();

        }else{

            alert(result.message);

        }

    }catch(err){

        console.error(err);

    }

}
    document
.getElementById("selectParticipant")
.onclick = async function(){

    await loadEvents();

    document
    .getElementById("assignEventModal")
    .classList.add("show");

};

document
.getElementById("rejectParticipant")
.onclick = function(){

    updatePerformer("rejectPerformer");

};

    async function loadEvents(){

    try{

        const response = await fetch(
            SCRIPT_URL + "?action=getEvents"
        );

        const result = await response.json();

        const eventSelect =
        document.getElementById("assignEventSelect");

        eventSelect.innerHTML =
        `<option value="">Select Event</option>`;

        if(result.success){

            result.events.forEach(event=>{

                eventSelect.innerHTML += `

                <option value="${event.id}">

                    ${event.name}
                    (${event.date})

                </option>

                `;

            });

        }

    }catch(err){

        console.error(err);

    }

}
    document
.getElementById("closeAssignModal")
.onclick = function(){

    document
    .getElementById("assignEventModal")
    .classList.remove("show");

};

document
.getElementById("cancelAssign")
.onclick = function(){

    document
    .getElementById("assignEventModal")
    .classList.remove("show");

};
    document
.getElementById("confirmAssign")
.onclick = async function(){

    const eventId =
    document.getElementById("assignEventSelect").value;

    if(eventId==""){

        alert("Please select an event.");

        return;

    }

    try{

        const response = await fetch(SCRIPT_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"selectPerformer",

                rowId:selectedParticipant.rowId,

                eventId:eventId

            })

        });

        const result = await response.json();

        if(result.success){

            alert(result.message);

            document
            .getElementById("assignEventModal")
            .classList.remove("show");

            document
            .getElementById("participantModal")
            .classList.remove("show");

            loadParticipants();

        }else{

            alert(result.message);

        }

    }catch(err){

        console.error(err);

    }

};
    document
.getElementById("participantSearch")
.addEventListener("input",applyFilters);

document
.getElementById("participantCategoryFilter")
.addEventListener("change",applyFilters);
loadParticipants();

}
