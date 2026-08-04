const AUDIENCE_SCRIPT_URL = JUDGE_SCRIPT_URL;
const url =
AUDIENCE_SCRIPT_URL +
"?action=verifyAudienceTicket" +
"&ticketId=" + encodeURIComponent(ticket);

console.log(url);

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
    document
    .getElementById("audienceTicket")
    .value
    .trim();

    if(ticket==""){

        alert("Enter Ticket ID");

        return;

    }

    try{

        const response =
        await fetch(

            AUDIENCE_SCRIPT_URL+

            "?action=verifyAudienceTicket"+

            "&ticketId="+encodeURIComponent(ticket)

        );

        const data =
        await response.json();

        if(!data.success){

            alert(data.message);

            return;

        }

        audienceTicket = ticket;

        selectedAudienceEvent =
        data.eventId;

        document
        .getElementById("ticketVerification")
        .style.display="none";

        document
        .getElementById("audienceContent")
        .style.display="block";

        console.log(data);

    }

    catch(error){

        console.log(error);

    }

}
