const JUDGE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyTOlWV-0vmAO3vfwR1IBKonAP3R6uxxd9mJFi9L6BXEBZ0g2oIYTRWimfzV789iMJE/exec";

let judgePerformers = [];

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
                duration:"5 min"
            },
            {
                id:"PER0002",
                name:"Priya Patel",
                category:"Dancer",
                duration:"4 min"
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

            <div class="icon">
                <i class="fa-solid fa-microphone"></i>
            </div>

            <div>

                <h3>${p.name}</h3>

                <p>${p.category}</p>

                <p>${p.duration}</p>

            </div>

            <button class="primary-btn">
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
