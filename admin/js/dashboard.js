const contentArea = document.getElementById("contentArea");

/* =========================================
PAGE CONFIG
========================================= */

const pages = {

dashboard:{
title:"Dashboard",
subtitle:"Overview of today's activity."
},

events:{
title:"Events",
subtitle:"Manage events, tickets and categories."
},

performers:{
title:"Performers",
subtitle:"Manage performer profiles."
},

scanner:{
title:"Scanner",
subtitle:"Scan audience tickets."
},

scoring:{
title:"Scoring",
subtitle:"Judge & audience scoring."
},

reports:{
title:"Reports",
subtitle:"View registrations and reports."
},

users:{
title:"Users",
subtitle:"Manage users and permissions."
}

};

/* =========================================
LOAD PAGE
========================================= */

function loadPage(page){

fetch(`modules/${page}.html`)

.then(res=>res.text())

.then(data=>{

contentArea.innerHTML=data;

document.getElementById("pageTitle").textContent=pages[page].title;

document.getElementById("pageSubtitle").textContent=pages[page].subtitle;

});

}

/* =========================================
SIDEBAR
========================================= */

document.querySelectorAll(".sidebar-menu li[data-page]")

.forEach(item=>{

item.addEventListener("click",()=>{

document

.querySelector(".sidebar-menu .active")

?.classList.remove("active");

item.classList.add("active");

loadPage(item.dataset.page);

});

});

/* =========================================
FIRST PAGE
========================================= */

loadPage("dashboard");
