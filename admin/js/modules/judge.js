const JUDGE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzdF7PVM-L5uS5KkZwiXqBy5JkDC1MMwjuCvWBV8BgqSgJziR2gTMi2GXvMH9XS7Uow/exec";

let judgePerformers = [];
let selectedJudgePerformer = null;
let selectedEventId = "";
let currentJudgeId = "JUDGE001";
let selectedScore = 0;

function initJudge(){

    console.log("Judge Panel Loaded");

    loadJudgeEvent();

}

async function loadJudgeEvent(){


const select =
document.getElementById("judgeEvent");


select.innerHTML =
`
<option>
Loading Event...
</option>
`;



try{


const response =
await fetch(
JUDGE_SCRIPT_URL+
"?action=getScoringEvents"
);



const data =
await response.json();



if(
data.success &&
data.events.length
){


select.innerHTML="";



data.events.forEach(event=>{


select.innerHTML +=
`

<option value="${event.id}">
${event.name}
</option>

`;



});



selectedEventId =
data.events[0].id;



select.value =
selectedEventId;



rebuildCustomSelect("judgeEvent");



loadJudgePerformers();



}
else{


select.innerHTML =
`
<option>
No Event Today
</option>
`;

}


}
catch(error){


console.log(error);


}



}
async function loadJudgePerformers(){


const container =
document.getElementById("judgeCards");



container.innerHTML=
`
<div class="empty-row">

<i class="fa-solid fa-spinner fa-spin"></i>

<p>
Loading Performers...
</p>

</div>
`;



try{


const response =
await fetch(

JUDGE_SCRIPT_URL+
"?action=getJudgeDashboard"+
"&eventId="+selectedEventId+
"&judgeId="+currentJudgeId

);



const data =
await response.json();



if(data.success){


judgePerformers =
data.performers;



renderJudgeCards();



document.getElementById(
"judgePerformerCount"
)
.innerText=data.total;



document.getElementById(
"judgeScoredCount"
)
.innerText=data.scored;



document.getElementById(
"judgePendingCount"
)
.innerText=data.pending;



}



}
catch(error){


console.log(error);


}


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
    onclick="openJudgeModal('${p.performerId}')"
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
selectedScore = 0;


document
.querySelectorAll(".score-buttons button")
.forEach(btn=>{

btn.classList.remove("active");

});
    
    selectedJudgePerformer =
judgePerformers.find(
p=>p.performerId==id
);

    if(!selectedJudgePerformer)
        return;

    const nameBox =
document.getElementById(
"judgePerformerName"
);


if(nameBox){

nameBox.innerText =
selectedJudgePerformer.name;

}

    document.getElementById(
        "judgePerformerCategory"
    ).innerText =
    selectedJudgePerformer.category;

    document
        .getElementById("judgeScoreModal")
        .classList.add("show");

}

function closeJudgeModal(){

    document
        .getElementById("judgeScoreModal")
        .classList.remove("show");

}

async function submitJudgeScore(){


const score = selectedScore;
if(score < 1 || score > 10){

alert("Please select score");

return;

}



const payload={


action:"saveJudgeScore",


judgeId:
currentJudgeId,


performerId:
selectedJudgePerformer.performerId,


eventId:
selectedEventId,


score:score


};



try{


const response =
await fetch(

JUDGE_SCRIPT_URL,

{

method:"POST",

body:
JSON.stringify(payload)

}

);



const result =
await response.json();



showSuccess(result.message);



if(result.success){


closeJudgeModal();


loadJudgePerformers();


}



}
catch(error){


console.log(error);


}


}
function selectScore(score){


selectedScore = score;


document
.querySelectorAll(".score-buttons button")
.forEach(btn=>{


btn.classList.remove("active");


});


event.target.classList.add("active");


}

function showSuccess(message){


const popup =
document.getElementById("successPopup");


document.getElementById(
"successMessage"
).innerText = message;


popup.classList.add("show");


setTimeout(()=>{


popup.classList.remove("show");


},2000);


}
