let users = [];

const USER_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyG4NcvfirTM1jLOGvff3Cu1uMobEEsAWrs1cx3chAs14zqwp2rsD8MJv48YTHCBkXG/exec";

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


if(
    !userModal ||
    !addUserBtn ||
    !closeUserModal ||
    !cancelUser
){
    console.log("Users page not loaded.");
    return;
}


const saveBtn =
document.getElementById("saveUser");


if(saveBtn){

    saveBtn.onclick = saveUser;

}


    addUserBtn.onclick = ()=>{


        openUserModal();


    };


    closeUserModal.onclick = closeModal;


    cancelUser.onclick = closeModal;



    userModal.onclick=function(e){


        if(e.target===userModal){

            closeModal();

        }

    };

    loadUsers();
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


    document.getElementById("userRole").value="Judge";

document.getElementById("userStatus").value="Active";


userModal.classList.add("show");


}
function closeModal(){

    userModal.classList.remove("show");

}
async function loadUsers(){

    try{

        const response =
        await fetch(USER_SCRIPT_URL+"?action=getUsers");


        const result =
        await response.json();


        if(result.success){

            users=result.users;

            renderUsers();

        }


    }
    catch(error){

        console.log(error);

    }

}
function renderUsers(){

const grid =
document.getElementById("usersGrid");


grid.innerHTML="";


if(users.length===0){

grid.innerHTML=`

<div class="empty">

<i class="fa-solid fa-users"></i>

<p>No Users Found</p>

</div>

`;

return;

}



users.forEach((user,index)=>{


grid.innerHTML+=`

<div class="user-card">


<h3>${user.name}</h3>


<p>
${user.email}
</p>


<span class="user-role">

${user.role}

</span>


<div class="user-actions">


<button
class="action-btn"
onclick="editUser(${index})">

<i class="fa-solid fa-pen"></i>

</button>



<button
class="action-btn"
onclick="deleteUser(${index})">

<i class="fa-solid fa-trash"></i>

</button>


</div>


</div>

`;


});


}
async function saveUser(){


const user={


name:
document.getElementById("userName").value.trim(),


mobile:
document.getElementById("userMobile").value.trim(),


email:
document.getElementById("userEmail").value.trim(),


username:
document.getElementById("userUsername").value.trim(),


password:
document.getElementById("userPassword").value.trim(),


role:
document.getElementById("userRole").value,


status:
document.getElementById("userStatus").value


};



if(
!user.name ||
!user.username ||
!user.password
){

alert("Please fill required fields");

return;

}



users.push(user);


renderUsers();


closeModal();


}
