const AUDIENCE_SCRIPT_URL = JUDGE_SCRIPT_URL;

let audienceTicket = "";
let audiencePerformers = [];
let selectedAudiencePerformer = null;
let selectedAudienceScore = 0;
let selectedAudienceEvent = "";

function initAudience(){

    console.log("Audience Panel Loaded");

}

async function verifyAudienceTicket(){

    const ticket =
    document.getElementById("audienceTicket").value.trim();

    if(ticket==""){

        alert("Enter Ticket ID");

        return;

    }

  audienceTicket = ticket;
selectedAudienceEvent = data.eventId;

console.log("Loading performers...");

await loadAudiencePerformers();

console.log("Performers loaded");

document.getElementById("ticketVerification").style.display = "none";
document.getElementById("audienceContent").style.display = "block";
}

async function loadAudiencePerformers(){

    const response =
    await fetch(

        AUDIENCE_SCRIPT_URL+

        "?action=getAudienceDashboard"+

        "&eventId="+selectedAudienceEvent+

        "&ticketId="+audienceTicket

    );

    const data =
    await response.json();

    if(!data.success) return;

    audiencePerformers =
    data.performers;

    renderAudienceCards();

    document.getElementById(
        "audiencePerformerCount"
    ).innerText =
    data.total;

    document.getElementById(
        "audienceScoredCount"
    ).innerText =
    data.voted;

    document.getElementById(
        "audiencePendingCount"
    ).innerText =
    data.pending;

}
function renderAudienceCards(){

    const container =
    document.getElementById("audienceCards");

    if(audiencePerformers.length==0){

        container.innerHTML=`

        <div class="empty-row">

            <i class="fa-solid fa-users"></i>

            <p>No Performers Found</p>

        </div>

        `;

        return;

    }

    container.innerHTML =
    audiencePerformers.map(p=>`

    <div class="judge-card">

        <div class="judge-top">

            <div class="icon">

                <i class="fa-solid fa-microphone"></i>

            </div>

            <div class="judge-info">

                <h3>${p.name}</h3>

                <span class="judge-category">

                    ${p.category}

                </span>

            </div>

        </div>

        <div class="judge-body">

            <div class="judge-row">

                <span>Title</span>

                <strong>${p.title}</strong>

            </div>

            <div class="judge-row">

                <span>Language</span>

                <strong>${p.language}</strong>

            </div>

            <div class="judge-row">

                <span>Duration</span>

                <strong>${p.duration}</strong>

            </div>

        </div>

        <button

            class="primary-btn"

            onclick="openAudienceModal('${p.performerId}')"

            ${p.voted ? "disabled" : ""}

        >

        ${p.voted ? "Already Voted" : "Vote Now"}

        </button>

    </div>

    `).join("");

}
