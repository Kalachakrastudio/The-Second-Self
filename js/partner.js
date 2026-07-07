const scriptURL =
"https://script.google.com/macros/s/AKfycbyYfAywSQ0GMFdw4V7v61eit6P4-oHTfXRnHT5CG16-decsPhm80Pt-H7opgMnvn44-/exec";

const form = document.getElementById("partnerForm");

const loadingPopup = document.getElementById("loadingPopup");
const successPopup = document.getElementById("successPopup");
const errorPopup = document.getElementById("errorPopup");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    // Show loading popup
    loadingPopup.classList.add("show");

    const formData = {

        sheet: "Partners",

        organization: form.organization.value,
        industry: form.industry.value,
        website: form.website.value,
        partnershipType: form.partnershipType.value,

        name: form.name.value,
        designation: form.designation.value,

        mobile: form.mobile.value,
        email: form.email.value,

        about: form.about.value,

        supportType: form.supportType.value,
        budget: form.budget.value,

        message: form.message.value,

        instagram: form.instagram.value,
        linkedin: form.linkedin.value,
        facebook: form.facebook.value,

        proposal: form.proposal.value

    };

    fetch(scriptURL, {

        method: "POST",
        body: JSON.stringify(formData)

    })

    .then(response => response.json())

    .then(data => {

        loadingPopup.classList.remove("show");

        successPopup.classList.add("show");

        form.reset();

    })

    .catch(error => {

        console.log(error);

        loadingPopup.classList.remove("show");

        errorPopup.classList.add("show");

    });

});


// Close Success Popup
document.getElementById("closePopup").addEventListener("click", function () {

    successPopup.classList.remove("show");

});


// Close Error Popup
document.getElementById("closeErrorPopup").addEventListener("click", function () {

    errorPopup.classList.remove("show");

});


// Close when clicking outside
window.addEventListener("click", function (e) {

    if (e.target === successPopup) {

        successPopup.classList.remove("show");

    }

    if (e.target === errorPopup) {

        errorPopup.classList.remove("show");

    }

});
