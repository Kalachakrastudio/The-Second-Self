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
    setTimeout(()=>{

    let role=document.getElementById("userRole");

    role.value="Judge";

    role.parentElement
    .querySelector(".select-selected")
    .textContent="Judge";



    let status=document.getElementById("userStatus");

    status.value="Active";

    status.parentElement
    .querySelector(".select-selected")
    .textContent="Active";


},60);
    document.getElementById("userStatus").value="Active";

userModal.classList.add("show");

setTimeout(()=>{

    if(
        !document.querySelector("#userRole")
        .parentElement.classList.contains("custom-select")
    ){

        rebuildCustomSelect("userRole");

    }


    if(
        !document.querySelector("#userStatus")
        .parentElement.classList.contains("custom-select")
    ){

        rebuildCustomSelect("userStatus");

    }

},50);

}

function closeModal(){

    userModal.classList.remove("show");

}
