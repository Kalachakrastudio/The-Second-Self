const SCORING_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxx_860ReXY9gGe21ClRqPS9UDCpRtGrAK9SVYJJNY265ikbBMdxD0iC0SyyH8AaMZO/exec";

let scoringEvents = [];
let scoringPerformers = [];
let selectedScoringEvent = null;

function initScoring(){

    console.log("Scoring Loaded");

    loadScoringEvents();

    const event =
    document.getElementById("scoringEvent");

    if(event){

        event.onchange=function(){

            selectedScoringEvent=this.value;

            loadScoringPerformers();

        };

    }

}

async function loadScoringEvents(){

    try{

        const response = await fetch(

            SCORING_SCRIPT_URL +
            "?action=getScoringEvents"

        );

        const result = await response.json();

        if(result.success){

            scoringEvents = result.events || [];

            renderScoringEvents();

        }

    }

    catch(err){

        console.log(err);

    }

}

function renderScoringEvents(){

    const select =
    document.getElementById("scoringEvent");

    select.innerHTML = `
        <option value="">
            Select Event
        </option>
    `;

    scoringEvents.forEach(event=>{

        select.innerHTML += `

            <option value="${event.id}">

                ${event.name}

            </option>

        `;

    });

    rebuildCustomSelect("scoringEvent");

}
async function loadScoringPerformers(){

    if(!selectedScoringEvent)
    return;

    const body =
    document.getElementById("scoringTable");

    body.innerHTML = `

        <tr>

            <td colspan="7" class="empty-row">

                <i class="fa-solid fa-spinner fa-spin"></i>

                <p>Loading Performers...</p>

            </td>

        </tr>

    `;

    try{

        const response = await fetch(

            SCORING_SCRIPT_URL +

            "?action=getScoringPerformers&eventId=" +

            selectedScoringEvent

        );

        const result = await response.json();

        if(result.success){

            scoringPerformers = result.performers || [];

            renderScoringTable();

        }

    }

    catch(err){

        console.log(err);

    }

}
function renderScoringTable(){

    const body =
    document.getElementById("scoringTable");

    body.innerHTML = "";

    if(scoringPerformers.length===0){

        body.innerHTML = `

        <tr>

            <td colspan="7" class="empty-row">

                <i class="fa-solid fa-users"></i>

                <p>No Performers Found</p>

            </td>

        </tr>

        `;

        return;

    }

    scoringPerformers.forEach(p=>{

        body.innerHTML += `

      <tr>

    <td>${p.name}</td>

    <td>${p.category}</td>

    <td>${p.language}</td>

    <td>${p.duration}</td>

    <td>

        <span class="status success">

            Selected

        </span>

    </td>

    <td>

        <button

            class="action-btn"

            onclick="openScoreDetails('${p.id}')">

            <i class="fa-solid fa-eye"></i>

        </button>

    </td>

</tr>

        `;

    });

    document.getElementById("scorePerformerCount").innerText =
    scoringPerformers.length;

}

let selectedPerformer = null;

function openScoreDetails(id){

    selectedPerformer =

    scoringPerformers.find(

        p => p.id == id

    );

    if(!selectedPerformer){

        return;

    }

    document.getElementById(
        "scoreModal"
    ).classList.add("show");

}
function closeScoreModal(){

    document
    .getElementById("scoreModal")
    .classList.remove("show");

}
