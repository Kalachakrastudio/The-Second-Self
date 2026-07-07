const scriptURL =
"https://script.google.com/macros/s/AKfycbyYfAywSQ0GMFdw4V7v61eit6P4-oHTfXRnHT5CG16-decsPhm80Pt-H7opgMnvn44-/exec";

const form =
document.getElementById("partnerForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const formData = {
        sheet:"Partners",
        organization:form.organization.value,
        industry:form.industry.value,
        website:form.website.value,
        partnershipType:form.partnershipType.value,

        name:form.name.value,
        designation:form.designation.value,

        mobile:form.mobile.value,
        email:form.email.value,

        about:form.about.value,

        supportType:form.supportType.value,
        budget:form.budget.value,

        message:form.message.value,

        instagram:form.instagram.value,
        linkedin:form.linkedin.value,
        facebook:form.facebook.value,

        proposal:form.proposal.value

    };

    fetch(scriptURL,{

        method:"POST",

        body:JSON.stringify(formData)

    })

    .then(res=>res.json())

    .then(data=>{

       document
.getElementById("successPopup")
.classList.add("show");

form.reset();

    })

    .catch(error=>{

        alert("Submission Failed");

        console.log(error);

    });

});

const popup =
document.getElementById("successPopup");

const closePopup =
document.getElementById("closePopup");

closePopup.addEventListener("click",()=>{

    popup.classList.remove("show");

});

popup.addEventListener("click",(e)=>{

    if(e.target===popup){

        popup.classList.remove("show");

    }

});
