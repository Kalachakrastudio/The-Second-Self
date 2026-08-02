const JUDGE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyTOlWV-0vmAO3vfwR1IBKonAP3R6uxxd9mJFi9L6BXEBZ0g2oIYTRWimfzV789iMJE/exec";

let judgePerformers = [];
let selectedJudgePerformer = null;

function initJudge(){

    console.log("Judge Panel Loaded");

    loadJudgeEvent();

}

async function loadJudgeEvent(){

    const select = document.getElementById("judgeEvent");

    select.innerHTML = `
        <option value="">Today's Event</option>
    `;

    rebuildCustomSelect("judgeEvent");

    loadJudgePerformers();

}

async function loadJudgePerformers(){

    const container = document.getElementById("judgeCards");

    container.innerHTML = `
        <div class="empty-row">
            <i class="fa-solid fa-spinner fa-spin"></i>
            <p>Loading Performers...</p>
        </div>
    `;

    setTimeout(()=>{

       judgePerformers = [

{

    id:"PER0001",

    name:"Amit Sharma",

    category:"Singer",

    title:"The Voice Within",

    language:"Hindi",

    duration:"5 Min"

},

{

    id:"PER0002",

    name:"Priya Patel",

    category:"Dancer",

    title:"Beyond Fear",

    language:"English",

    duration:"4 Min"

}

];
        renderJudgeCards();

    },500);

}

function renderJudgeCards(){

    const container = document.getElementById("judgeCards");

    if(judgePerformers.length===0){

        container.innerHTML = `
            <div class="empty-row">
                <i class="fa-solid fa-users"></i>
                <p>No performers found</p>
            </div>
        `;

        return;

    }

    container.innerHTML = judgePerformers.map(p=>`

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
    onclick="openJudgeModal('${p.id}')"
>
    Score Now
</button>

</div>

    `).join("");

    document.getElementById("judgePerformerCount").innerText =
    judgePerformers.length;

    document.getElementById("judgeScoredCount").innerText = 0;

    document.getElementById("judgePendingCount").innerText =
    judgePerformers.length;

}
function openJudgeModal(id){

    selectedJudgePerformer =
    judgePerformers.find(p=>p.id==id);

    if(!selectedJudgePerformer)
        return;

    document.getElementById(
        "judgePerformerName"
    ).innerText =
    selectedJudgePerformer.name;

    document.getElementById(
        "judgePerformerCategory"
    ).innerText =
    selectedJudgePerformer.category;

    document.getElementById(
        "storyScore"
    ).value="";

    document.getElementById(
        "performanceScore"
    ).value="";

    document.getElementById(
        "expressionScore"
    ).value="";

    document.getElementById(
        "judgeComment"
    ).value="";

    document
        .getElementById("judgeScoreModal")
        .classList.add("show");

}

function closeJudgeModal(){

    document
        .getElementById("judgeScoreModal")
        .classList.remove("show");

}

function submitJudgeScore(){

    const story =
    Number(
        document.getElementById("storyScore").value
    );

    const performance =
    Number(
        document.getElementById("performanceScore").value
    );

    const expression =
    Number(
        document.getElementById("expressionScore").value
    );

    const comment =
    document.getElementById("judgeComment").value;

    if(

        story<1 ||
        performance<1 ||
        expression<1

    ){

        alert("Please enter all scores.");

        return;

    }

    console.log({

        performer:selectedJudgePerformer,

        story,

        performance,

        expression,

        comment

    });

    closeJudgeModal();

}
