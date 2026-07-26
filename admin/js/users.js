/*=========================================
USER MODAL
=========================================*/

const userModal =
document.getElementById("userModal");

const addUserBtn =
document.getElementById("addUserBtn");

const closeUserModal =
document.getElementById("closeUserModal");

const cancelUser =
document.getElementById("cancelUser");

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

addUserBtn.onclick = openUserModal;

closeUserModal.onclick = closeModal;

cancelUser.onclick = closeModal;

userModal.onclick = function(e){

    if(e.target===userModal){

        closeModal();

    }

};
