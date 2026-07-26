let reportData=[];


const REPORT_SCRIPT_URL =
"https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec";



function initReports(){


console.log("Reports loaded");



const type =
document.getElementById("reportType");


if(!type)
return;



type.onchange=function(){

loadReport(this.value);

};



document
.getElementById("reportSearch")
.oninput=function(){

filterReport(this.value);

};



document
.getElementById("exportReport")
.onclick=
exportReport;



}



async function loadReport(type){


if(!type)
return;



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

}



}





function renderReport(data){


const head =
document.getElementById("reportHead");


const body =
document.getElementById("reportBody");



head.innerHTML="";
body.innerHTML="";



if(data.length===0){

body.innerHTML=
`
<tr>
<td>No Data Found</td>
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
