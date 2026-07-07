const scriptURL =
"https://script.google.com/macros/s/AKfycbyYfAywSQ0GMFdw4V7v61eit6P4-oHTfXRnHT5CG16-decsPhm80Pt-H7opgMnvn44-/exec";

const form =
document.getElementById("performerForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = {
        sheet:"Performers",
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

        videoLink: form.videoLink.value

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
