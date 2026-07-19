const API_URL =
"https://script.google.com/macros/s/AKfycbyLcx8yNVd-6ksf7_imAd3dWy37Fy9KVBpGBaYrL_Qa1zq_7_TrVtxnE6X5XoKak-9u/exec";



let participants=[];

let selectedRow=null;



// ==========================
// Load Participants
// ==========================

async function loadParticipants(){


const res =
await fetch(
API_URL+"?action=getPerformers"
);


const data =
await res.json();


participants =
data.performers;


renderParticipants(participants);


}




// ==========================
// Render Table
// ==========================

function renderParticipants(list){


const table =
document.getElementById(
"participantTable"
);



table.innerHTML="";



list.forEach(p=>{


table.innerHTML += `


<tr>


<td>

${p.Name}

</td>



<td>

${p.Category}

</td>



<td>

${p.City}

</td>



<td>

${p.Age}

</td>



<td>

<span class="status pending">

Pending

</span>

</td>



<td>


<button

class="action-button"

onclick="openAction(
${p.rowId},
'${p.Name}',
'${p.Category}',
'${p.Story}'
)"

>

Action

</button>


</td>



</tr>


`;


});


}



// ==========================
// Open Action Popup
// ==========================

function openAction(
rowId,
name,
category,
story
){


selectedRow=rowId;



document
.getElementById("modalName")
.innerHTML=name;



document
.getElementById("modalDetails")
.innerHTML=

`

Category:
${category}

<br><br>

Story:

${story}

`;



document
.getElementById("actionModal")
.style.display="flex";


}



// ==========================
// Select
// ==========================

async function selectParticipant(){


let eventId =
prompt(
"Enter Event ID"
);



if(!eventId)
return;



await fetch(
API_URL,
{

method:"POST",

body:JSON.stringify({

action:"selectPerformer",

rowId:selectedRow,

eventId:eventId

})

});


closeModal();


loadParticipants();


}




// ==========================
// Reject
// ==========================

async function rejectParticipant(){



await fetch(

API_URL,

{

method:"POST",

body:JSON.stringify({

action:"rejectPerformer",

rowId:selectedRow

})

}

);



closeModal();


loadParticipants();


}



// ==========================
// Close Modal
// ==========================

function closeModal(){


document
.getElementById("actionModal")
.style.display="none";


}



// Start

loadParticipants();
