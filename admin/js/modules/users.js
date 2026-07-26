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

    document.getElementById("userModalTitle").textContent =
    "Add User";

    document.getElementById("userId").value="";

    document.getElementById("userName").value="";
    document.getElementById("userMobile").value="";
    document.getElementById("userEmail").value="";
    document.getElementById("userUsername").value="";
    document.getElementById("userPassword").value="";
    document.getElementById("userRole").value="Judge";
    document.getElementById("userStatus").value="Active";

    userModal.classList.add("show");

}

function closeModal(){

    userModal.classList.remove("show");

}
