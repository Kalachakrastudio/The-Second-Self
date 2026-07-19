const contentArea = document.getElementById("contentArea");

const pageInfo = {

    dashboard:{
        title:"Dashboard",
        subtitle:"Overview of today's activity."
    },

    events:{
        title:"Events",
        subtitle:"Create and manage events."
    },

    performers:{
        title:"Performers",
        subtitle:"Manage performer registrations."
    },

    scanner:{
        title:"Scanner",
        subtitle:"Scan and verify audience tickets."
    },

    scoring:{
        title:"Scoring",
        subtitle:"Judge performer scores."
    },

    reports:{
        title:"Reports",
        subtitle:"View reports and export data."
    },

    users:{
        title:"Users",
        subtitle:"Manage admin accounts and permissions."
    }

};

async function loadPage(page){

    try{

        const response = await fetch(`modules/${page}.html`);

        const html = await response.text();

        contentArea.innerHTML = html;

        document.getElementById("pageTitle").textContent =
            pageInfo[page].title;

        document.getElementById("pageSubtitle").textContent =
            pageInfo[page].subtitle;

        loadModule(page);

    }
    catch(error){

        console.error(error);

    }

}

function loadModule(page){

    switch(page){

        case "dashboard":
            if(typeof dashboardInit==="function") dashboardInit();
            break;

        case "events":
            if(typeof initEvents==="function") initEvents();
            break;

        case "performers":
            if(typeof initPerformers==="function") initPerformers();
            break;

        case "scanner":
            if(typeof initScanner==="function") initScanner();
            break;

        case "scoring":
            if(typeof initScoring==="function") initScoring();
            break;

        case "reports":
            if(typeof initReports==="function") initReports();
            break;

        case "users":
            if(typeof initUsers==="function") initUsers();
            break;

    }

}

document.querySelectorAll(".sidebar-menu li[data-page]").forEach(item=>{

    item.addEventListener("click",()=>{

        document.querySelector(".sidebar-menu .active")
            ?.classList.remove("active");

        item.classList.add("active");

        loadPage(item.dataset.page);

    });

});

loadPage("dashboard");
