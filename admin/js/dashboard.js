const contentArea = document.getElementById("contentArea");

async function loadPage(page,title){

    const html = await fetch(`modules/${page}.html`);

    const data = await html.text();

    contentArea.innerHTML = data;

    document.getElementById("pageTitle").textContent = title;

    loadModule(page);

}

function loadModule(page){

    switch(page){

        case "dashboard":

            if(typeof dashboardInit==="function"){

                dashboardInit();

            }

        break;

        case "events":

            if(typeof eventsInit==="function"){

                eventsInit();

            }

        break;

        case "participants":

            if(typeof participantsInit==="function"){

                participantsInit();

            }

        break;

        case "scanner":

            if(typeof scannerInit==="function"){

                scannerInit();

            }

        break;

        case "scoring":

            if(typeof scoringInit==="function"){

                scoringInit();

            }

        break;

        case "reports":

            if(typeof reportsInit==="function"){

                reportsInit();

            }

        break;

        case "users":

            if(typeof usersInit==="function"){

                usersInit();

            }

        break;

    }

}

document.querySelectorAll(".sidebar-menu li[data-page]")

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
