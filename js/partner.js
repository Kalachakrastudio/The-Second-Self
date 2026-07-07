const scriptURL =
"https://script.google.com/macros/s/AKfycbyjVNhkGFDQaIZTs2yYWBa1aWa9x04eq4UqU6JNGJjg3ZhBIzf4rdXSpRDwfnzfje9X/exec";

const form =
document.getElementById("partnerForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const formData = {

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

        alert("Partnership Application Submitted Successfully!");

        form.reset();

    })

    .catch(error=>{

        alert("Submission Failed");

        console.log(error);

    });

});
