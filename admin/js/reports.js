let reportData=[];


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



if(!data || data.length===0){

    console.log("Empty report data");

    head.innerHTML="";

    body.innerHTML=`

    <tr>

        <td
            colspan="100"
            class="empty-row report-empty-cell">

            <i class="fa-solid fa-table-list"></i>

            <p>No report data available.</p>

            <small>
                Select a report from the dropdown to view records.
            </small>

        </td>

    </tr>

    `;

    return;

}

let columns =
Object.keys(data[0]);



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



body.innerHTML=
data.map(row=>{


return `

<tr>

${
columns.map(c=>
`
<td>${row[c] || "-"}</td>
`
).join("")
}


</tr>


`;


}).join("");



}






function filterReport(value){


value=value.toLowerCase();


const filtered =
reportData.filter(row=>{


return Object.values(row)
.some(v=>

String(v)
.toLowerCase()
.includes(value)

);


});


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
