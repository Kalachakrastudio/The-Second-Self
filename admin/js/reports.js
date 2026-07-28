let reportData = [];
let currentReportType = "";
let selectedPartner = null;

const REPORT_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxZujwzWBqZ9UazdJUnBoizig9sLlEFDodoVVd5aPcTkZcku32UGUI4aByxvNtPC2U/exec";



function initReports(){

console.log("Reports loaded");


const type =
document.getElementById("reportType");


if(!type){

console.log("Report dropdown missing");

return;

}


// create custom dropdown

setTimeout(()=>{

    rebuildCustomSelect("reportType");

},100);



type.onchange=function(){

console.log(
"Selected:",
this.value
);


loadReport(this.value);


};



const search =
document.getElementById("reportSearch");


if(search){

search.oninput=function(){

filterReport(this.value);

};

}




const exportBtn =
document.getElementById("exportReport");


if(exportBtn){

exportBtn.onclick =
exportReport;

}
    const saveBtn =
document.getElementById("saveFollowup");

if(saveBtn){

    saveBtn.onclick = savePartnerFollowup;

}

}

async function loadReport(type){


if(!type)
return;

currentReportType = type;

document.getElementById("reportHead").innerHTML="";

document.getElementById("reportBody").innerHTML=`

<tr>

<td colspan="100" class="empty-row report-empty-cell">

<i class="fa-solid fa-spinner fa-spin"></i>

<p>Loading Report...</p>

<small>
Please wait while we fetch the records.
</small>

</td>

</tr>

`;


try{


const response =
await fetch(
REPORT_SCRIPT_URL+
"?action=getReport&type="+type
);



const result =
await response.json();



if(result.success){


reportData=result.data;


renderReport(reportData);


}



}
catch(err){

console.log(err);


document.getElementById("reportBody").innerHTML=
`
<tr>
<td colspan="10">
Error loading data
</td>
</tr>
`;

}


}





function renderReport(data){
console.log("REPORT DATA:",data);

const head =
document.getElementById("reportHead");


const body =
document.getElementById("reportBody");



head.innerHTML="";
body.innerHTML="";

if(!data || data.length === 0){

    body.innerHTML = `
    <tr>
        <td colspan="100" class="report-empty-cell">

            <div class="empty-row">

                <i class="fa-solid fa-table-list"></i>

                <p>No Report Data Available</p>

                <small>
                    This report doesn't contain any records yet.
                </small>

            </div>

        </td>
    </tr>
    `;

    return;
}

let columns = [...Object.keys(data[0])];

if(currentReportType === "partners"){

    columns.push("Actions");

}



head.innerHTML=
`
<tr>

${
columns.map(c=>
`
<th>${c}</th>
`
).join("")
}

</tr>
`;



body.innerHTML = data.map(row => {

    return `
        <tr>

            ${columns.map(column => {

                if (
                    column === "Actions" &&
                    currentReportType === "partners"
                ) {

                    return `
                        <td class="action-cell">

                            <button
                                class="action-btn"
                                onclick="viewPartner('${row["Partner ID"]}')">

                                <i class="fa-solid fa-eye"></i>

                            </button>

                        </td>
                    `;

                }

                return `
                    <td>${row[column] || "-"}</td>
                `;

            }).join("")}

        </tr>
    `;

}).join("");
}

function filterReport(value){

    value = value.toLowerCase().trim();

    const filtered = reportData.filter(row => {

        return Object.values(row).some(v =>
            String(v).toLowerCase().includes(value)
        );

    });

    if(filtered.length === 0){

        document.getElementById("reportBody").innerHTML = `
        <tr>
            <td colspan="100" class="report-empty-cell">

                <div class="empty-row">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <p>No Matching Records</p>

                    <small>
                        Try another keyword.
                    </small>

                </div>

            </td>
        </tr>
        `;

        return;
    }

    renderReport(filtered);

}



function exportReport(){


let csv="";



const rows =
document.querySelectorAll(
".report-table tr"
);



rows.forEach(row=>{


let cols =
row.querySelectorAll("td,th");


let line=[];


cols.forEach(c=>{


line.push(
`"${c.innerText}"`
);


});


csv+=line.join(",")+"\n";


});



let blob =
new Blob(
[csv],
{
type:"text/csv"
}
);



let url =
URL.createObjectURL(blob);



let a =
document.createElement("a");


a.href=url;


a.download=
"report.csv";


a.click();


}

window.viewPartner = function(partnerId){


selectedPartner =
reportData.find(
p => String(p["Partner ID"]) === String(partnerId)
);



if(!selectedPartner){

alert("Partner not found");

return;

}



document.getElementById("partnerCompanyInfo").innerHTML = `


<div class="crm-field">

<label>
Organization
</label>

<span>
${selectedPartner["Organization"] || "-"}
</span>

</div>



<div class="crm-field">

<label>
Industry
</label>

<span>
${selectedPartner["Industry"] || "-"}
</span>

</div>




<div class="crm-field">

<label>
Website
</label>

<span>
${selectedPartner["Website"] || "-"}
</span>

</div>




<div class="crm-field">

<label>
Contact Name
</label>

<span>
${selectedPartner["Name"] || "-"}
</span>

</div>




<div class="crm-field">

<label>
Designation
</label>

<span>
${selectedPartner["Designation"] || "-"}
</span>

</div>




<div class="crm-field">

<label>
Mobile
</label>

<span>
${selectedPartner["Mobile"] || "-"}
</span>

</div>




<div class="crm-field">

<label>
Email
</label>

<span>
${selectedPartner["Email"] || "-"}
</span>

</div>



`;




document.getElementById("partnerSponsorInfo").innerHTML = `



<div class="crm-field">

<label>
Partnership Type
</label>

<span>
${selectedPartner["Partnership Type"] || "-"}
</span>

</div>



<div class="crm-field">

<label>
Support Type
</label>

<span>
${selectedPartner["Support Type"] || "-"}
</span>

</div>



<div class="crm-field">

<label>
Budget
</label>

<span>
${selectedPartner["Budget"] || "-"}
</span>

</div>



<div class="crm-field">

<label>
Proposal
</label>

<span>
${selectedPartner["Proposal"] || "-"}
</span>

</div>


<div class="crm-field">

<label>
Date
</label>

<span>
${selectedPartner["Date"] || "-"}
</span>

</div>



`;


const modal = document.getElementById("partnerModal");

modal.classList.add("show");

// Close Button
const closeBtn = document.getElementById("closePartnerModal");

if(closeBtn){

    closeBtn.onclick = function(){

        modal.classList.remove("show");

    };

}

// Click Outside
modal.onclick = function(e){

    if(e.target === modal){

        modal.classList.remove("show");

    }

};

requestAnimationFrame(() => {
    rebuildCustomSelect("followupStatus");
});

}

async function savePartnerFollowup(){

    if(!selectedPartner){

        alert("No Partner Selected");

        return;

    }

    const status =
    document.getElementById("followupStatus").value;

    const discussion =
document.getElementById("followupNotes").value.trim();

    const nextFollowup =
    document.getElementById("nextFollowup").value;

    if(!status){

        alert("Select Status");

        return;

    }

    if(!discussion){

        alert("Enter Discussion");

        return;

    }

    const payload = {

        action:"savePartnerFollowup",

        partnerId:selectedPartner["Partner ID"],

        status:status,

        discussion:discussion,

        nextFollowup:nextFollowup,

        updatedBy:"Admin"

    };

    try{

        const response = await fetch(REPORT_SCRIPT_URL,{

            method:"POST",

            body:JSON.stringify(payload)

        });

        const result = await response.json();

        if(result.success){

            alert("Followup Saved Successfully");

            document.getElementById("followupNotes").value = "";
            document.getElementById("nextFollowup").value = "";
            document.getElementById("followupStatus").selectedIndex = 0;
            
            rebuildCustomSelect("followupStatus");

        }

        else{

            alert(result.message);

        }

    }

    catch(err){

        console.log(err);

        alert("Unable to save followup.");

    }

}
