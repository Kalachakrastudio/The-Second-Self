let reportData=[];
let currentReportType = "";
let currentReportType = "";

const REPORT_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwognwSjNS52BkrhCAk3gyi2Z8nb-n2irDhXc_OuNdQMDDnmVuWi_sMQpHV3S8sOEKU/exec";



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

    document.getElementById("partnerDetails").innerHTML = `

        <h3>${selectedPartner["Company Name"] || "-"}</h3>

        <p>

            Partner details will be shown here.

        </p>

    `;

    document
    .getElementById("partnerModal")
    .classList.add("show");

};

document.addEventListener("click",function(e){

    if(

        e.target.id==="closePartnerModal"

    ){

        document
        .getElementById("partnerModal")
        .classList.remove("show");

    }

});
