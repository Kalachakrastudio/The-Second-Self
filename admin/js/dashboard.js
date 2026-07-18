const contentArea = document.getElementById("contentArea");

async function loadPage(page, title) {

    try {

        const response = await fetch(`modules/${page}.html`);

        const html = await response.text();

        contentArea.innerHTML = html;

        document.getElementById("pageTitle").textContent = title;

        loadModule(page);

    } catch (error) {

        console.error("Error loading page:", error);

    }

}

function loadModule(page) {

    switch (page) {

        case "dashboard":

            if (typeof dashboardInit === "function") {
                dashboardInit();
            }

            break;

        case "events":

            if (typeof initEvents === "function") {
                initEvents();
            }

            break;

        case "performers":

            if (typeof initPerformers === "function") {
                initPerformers();
            }

            break;

        case "scanner":

            if (typeof initScanner === "function") {
                initScanner();
            }

            break;

        case "scoring":

            if (typeof initScoring === "function") {
                initScoring();
            }

            break;

        case "reports":

            if (typeof initReports === "function") {
                initReports();
            }

            break;

        case "users":

            if (typeof initUsers === "function") {
                initUsers();
            }

            break;

    }

}

document.querySelectorAll(".sidebar-menu li[data-page]").forEach(item => {

    item.addEventListener("click", () => {

        document.querySelector(".sidebar-menu .active")
            ?.classList.remove("active");

        item.classList.add("active");

        loadPage(item.dataset.page, item.dataset.title);

    });

});

loadPage("dashboard", "Dashboard");
