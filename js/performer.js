const scriptURL =
"https://script.google.com/macros/s/AKfycbwLxdU3EA4r_gyZL_m9ywaOBjH90wB6eeIDk_FWnKlqRwG12-hgjhJGl5qfdKFeJBDf/exec";

const form = document.getElementById("performerForm");

const loadingPopup = document.getElementById("loadingPopup");
const successPopup = document.getElementById("successPopup");
const errorPopup = document.getElementById("errorPopup");

const closePopup = document.getElementById("closePopup");
const closeErrorPopup = document.getElementById("closeErrorPopup");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    loadingPopup.classList.add("show");

    const formData = {

        sheet: "Performers",

        name: form.name.value,
        age: form.age.value,
        gender: form.gender.value,

        mobile: form.mobile.value,
        email: form.email.value,

        profession: form.profession.value,
        city: form.city.value,
        state: form.state.value,

        category: form.category.value,
        title: form.title.value,

        language: form.language.value,
        duration: form.duration.value,

        story: form.story.value,

        instagram: form.instagram.value,
        youtube: form.youtube.value,
        website: form.website.value,

        videoLink: form.videoLink.value

    };

    fetch(scriptURL, {

        method: "POST",

        body: JSON.stringify(formData)

    })

    .then(res => res.json())

    .then(data => {

        loadingPopup.classList.remove("show");

        successPopup.classList.add("show");

        form.reset();

    })

    .catch(error => {

        console.error(error);

        loadingPopup.classList.remove("show");

        errorPopup.classList.add("show");

    });

});

closePopup.addEventListener("click", () => {

    successPopup.classList.remove("show");

});

closeErrorPopup.addEventListener("click", () => {

    errorPopup.classList.remove("show");

});

successPopup.addEventListener("click", (e) => {

    if (e.target === successPopup) {

        successPopup.classList.remove("show");

    }

});

errorPopup.addEventListener("click", (e) => {

    if (e.target === errorPopup) {

        errorPopup.classList.remove("show");

    }

});
