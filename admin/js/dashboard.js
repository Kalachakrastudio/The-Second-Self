const contentArea=document.getElementById("contentArea");

function loadPage(page,title){

fetch(`modules/${page}.html`)

.then(res=>res.text())

.then(data=>{

contentArea.innerHTML=data;

document.getElementById("pageTitle").textContent=title;

});

}

document.querySelectorAll(".sidebar-menu li")

.forEach(item=>{

item.addEventListener("click",()=>{

document.querySelector(".sidebar-menu .active")

?.classList.remove("active");

item.classList.add("active");

loadPage(

item.dataset.page,

item.dataset.title

);

});

});

loadPage("dashboard","Dashboard");
