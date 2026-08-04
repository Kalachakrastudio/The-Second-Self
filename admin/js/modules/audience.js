const AUDIENCE_SCRIPT_URL = JUDGE_SCRIPT_URL;

const response = await fetch(url);

let audienceTicket = "";

let audiencePerformers = [];

let selectedAudiencePerformer = null;

let selectedAudienceScore = 0;

let selectedAudienceEvent = "";

function initAudience(){

    console.log("Audience Panel Loaded");

}
async function verifyAudienceTicket(){

    const ticket =
    document.getElementById("audienceTicket").value.trim();

    if(ticket==""){

        alert("Enter Ticket ID");

        return;

    }

    try{

        const url =
        AUDIENCE_SCRIPT_URL +
        "?action=verifyAudienceTicket" +
        "&ticketId=" + encodeURIComponent(ticket);

        console.log("Request URL:", url);

        const response = await fetch(url);

        console.log("Status:", response.status);

        const data = await response.json();

        console.log(data);

    }
    catch(error){

        console.error(error);

    }

}
