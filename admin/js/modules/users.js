let userModal;
let addUserBtn;
let closeUserModal;
let cancelUser;

function initUsers(){
    console.log("initUsers called");
    userModal = document.getElementById("userModal");
    addUserBtn = document.getElementById("addUserBtn");
    closeUserModal = document.getElementById("closeUserModal");
    cancelUser = document.getElementById("cancelUser");
      console.log({
        userModal,
        addUserBtn,
        closeUserModal,
        cancelUser
    });

    if(
        !userModal ||
        !addUserBtn ||
        !closeUserModal ||
        !cancelUser
    ){
        console.log("Users page not loaded.");
        return;
    }

    addUserBtn.onclick = openUserModal;

closeUserModal.onclick = closeModal;

cancelUser.onclick = closeModal;


userModal.onclick = function(e){

    if(e.target===userModal){

        closeModal();

    }

};

}
/*=========================================
USER MODAL
=========================================*/

function openUserModal(){

    console.log("Open Modal Clicked");


    document.getElementById("userModalTitle").textContent =
    "Add User";


    document.getElementById("userId").value="";

    document.getElementById("userName").value="";
    document.getElementById("userMobile").value="";
    document.getElementById("userEmail").value="";
    document.getElementById("userUsername").value="";
    document.getElementById("userPassword").value="";


    userModal.classList.add("show");


setTimeout(()=>{

    initUserDropdowns();

},100);


}
function closeModal(){

    userModal.classList.remove("show");

}


function initUserDropdowns(){

    console.log("User dropdown init");


    let role = document.getElementById("userRole");
    let status = document.getElementById("userStatus");


    if(role){

        role.selectedIndex = 1; // Judge

        if(!role.parentElement.classList.contains("custom-select")){

            rebuildCustomSelect("userRole");

        }

    }



    if(status){

        status.selectedIndex = 0; // Active

        if(!status.parentElement.classList.contains("custom-select")){

            rebuildCustomSelect("userStatus");

        }

    }

}
