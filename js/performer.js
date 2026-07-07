const scriptURL =
"https://script.google.com/macros/s/AKfycbwdZRZk2GNV7iRA6xi2GduGuNaG6OPkiVbK9fAtbWVBK9REQK-AIRlgxFNwFbIzX9g/exec";

const form =
document.getElementById("performerForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = {

        name:form.name.value,
        age:form.age.value,
        gender:form.gender.value,

        mobile:form.mobile.value,
        email:form.email.value,

        profession:form.profession.value,
        city:form.city.value,
        state:form.state.value,

        category:form.category.value,
        title:form.title.value,

        language:form.language.value,
        duration:form.duration.value,

        story:form.story.value,

        instagram:form.instagram.value,
        youtube:form.youtube.value,
        website:form.website.value,

        video:"Video Uploaded"

    };

    fetch(scriptURL,{

        method:"POST",

        body:JSON.stringify(formData)

    })

    .then(res=>res.json())

    .then(data=>{

        alert("Application Submitted Successfully!");

        form.reset();

    })

    .catch(err=>{

        alert("Submission Failed");

        console.log(err);

    });

});
