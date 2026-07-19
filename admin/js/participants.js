function initParticipants(){

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwQRiWw82Bp1PCWfnKUqr6Hh_pfm3KbHNzXgC_8Yxa1Jkmh_V5IAVHjB0BZpCX0XlNX/exec";



let participants=[];

let selectedParticipant=null;



const table =
document.getElementById("participantTable");



async function loadParticipants(){


try{


const response =
await fetch(
SCRIPT_URL+"?action=getPerformers"
);



const result =
await response.json();



if(result.success){


participants=result.performers;


populateFilters();

renderParticipants(participants);


}



}

catch(err){

console.log(err);

}


}



function renderParticipants(data){


table.innerHTML="";



if(data.length===0){


table.innerHTML=`

<tr>

<td colspan="6" class="empty-row">


<i class="fa-solid fa-user-slash"></i>


<p>
No Pending Participants
</p>


<small>
All performers are processed.
</small>


</td>

</tr>

`;

return;

}



data.forEach((p)=>{


table.innerHTML +=`

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

Not Assigned

</td>



<td>

<span class="status upcoming">

Pending

</span>

</td>



<td>


<button

class="action-btn"

onclick="viewParticipant(${p.rowId})"

>

<i class="fa-solid fa-eye"></i>


</button>


</td>



</tr>


`;

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
