let users = [];
let editUserId = null;
 
const USER_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwEkM7C8FjrLRCBH9FQAOPT59-AxScThS13vO1G2Of1LobEdKp_Cq9eHcOj2ck7HH-Z/exec";

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

initUserSearch();

}
/*=========================================
USER MODAL
=========================================*/

function openUserModal(){

 editUserId = null;

    document.getElementById("userModalTitle").textContent =
    "Add User";


    document.getElementById("userName").value="";
    document.getElementById("userMobile").value="";
    document.getElementById("userEmail").value="";
    document.getElementById("userUsername").value="";
    document.getElementById("userPassword").value="";


    updateCustomDropdown(
        "userRole",
        "Judge"
    );
document.getElementById("userRole")
.dispatchEvent(new Event("change"));

    updateCustomDropdown(
        "userStatus",
        "Active"
    );


    userModal.classList.add("show");
setTimeout(()=>{

    const role =
    document.getElementById("userRole");

    const status =
    document.getElementById("userStatus");


    if(
        role &&
        !role.closest(".custom-select")
    ){

        rebuildCustomSelect("userRole");

    }


    if(
        status &&
        !status.closest(".custom-select")
    ){

        rebuildCustomSelect("userStatus");

    }


},100);
}
function closeModal(){

    userModal.classList.remove("show");

}

function updateCustomDropdown(id,value){

    const select=document.getElementById(id);

    if(!select) return;


    select.value=value;


    const wrapper =
    select.closest(".custom-select");


    if(!wrapper) {
        console.log("No wrapper found",id);
        return;
    }


    const selected =
    wrapper.querySelector(".select-selected");


    if(selected){

        selected.textContent =
        select.options[select.selectedIndex].text;

    }


    const items =
    wrapper.querySelectorAll(".select-items div");


    items.forEach(item=>{


        item.classList.remove(
            "same-as-selected"
        );


        if(
            item.textContent.trim() ==
            value
        ){

            item.classList.add(
                "same-as-selected"
            );

        }


    });


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
function renderUsers(data = users){

const grid =
document.getElementById("usersGrid");


grid.innerHTML="";


if(data.length===0){

grid.innerHTML=`

<div class="empty">

<i class="fa-solid fa-users"></i>

<p>No Users Found</p>

</div>

`;

return;

}


data.forEach((user)=>{


grid.innerHTML+=`

<div class="user-card">


<h3>${user["Name"]}</h3>


<p>
${user["Email"]}
</p>


<p>
ID: ${user["User ID"]}
</p>


<span class="user-role">

${user["Role"]}

</span>


<span class="user-status ${user["Status"].toLowerCase()}">

${user["Status"]}

</span>


<div class="user-actions">


<button
class="action-btn"
onclick="editUser('${user["User ID"]}')">

<i class="fa-solid fa-pen"></i>

</button>



<button
class="action-btn"
onclick="deleteUser('${user["User ID"]}')">

<i class="fa-solid fa-trash"></i>

</button>


</div>


</div>

`;


});


}
async function saveUser(){
console.log(
document.getElementById("userRole").value
);

console.log(
document.getElementById("userStatus").value
);

const user={


action: editUserId ? "updateUser" : "saveUser",

id: editUserId,

name:
document.getElementById("userName").value,


mobile:
document.getElementById("userMobile").value,


email:
document.getElementById("userEmail").value,


username:
document.getElementById("userUsername").value,


password:
document.getElementById("userPassword").value,


role:
document.getElementById("userRole").value,


status:
document.getElementById("userStatus").value


};



try{


const response =
await fetch(USER_SCRIPT_URL,{

method:"POST",

headers:{
"Content-Type":"text/plain;charset=utf-8"
},

body:JSON.stringify(user)

});


const result =
await response.json();



if(result.success){


alert(
editUserId 
? "User Updated"
: "User Added"
);


closeModal();

editUserId = null;
 
loadUsers();


}


}
catch(error){

console.log(error);

alert("Error saving user");

}


}
async function deleteUser(id){


if(!confirm("Delete this user?")) return;



try{


const response =
await fetch(USER_SCRIPT_URL,{

method:"POST",

headers:{
"Content-Type":"text/plain;charset=utf-8"
},

body:JSON.stringify({

action:"deleteUser",

id:id

})

});



const result =
await response.json();



if(result.success){


alert("User Deleted");


loadUsers();


}



}
catch(error){

console.log(error);

}


}

function editUser(id){


const user =
users.find(
u => String(u["User ID"]) == String(id)
);



if(!user){

alert("User not found");

return;

}



editUserId=id;



document.getElementById("userModalTitle").textContent =
"Edit User";



document.getElementById("userName").value =
user["Name"];



document.getElementById("userMobile").value =
user["Mobile"];



document.getElementById("userEmail").value =
user["Email"];



document.getElementById("userUsername").value =
user["Username"];



document.getElementById("userPassword").value =
user["Password"];



updateCustomDropdown(
"userRole",
user["Role"]
);

 document.getElementById("userRole")
.dispatchEvent(new Event("change"));

updateCustomDropdown(
"userStatus",
user["Status"]
);


userModal.classList.add("show");



}


function initUserSearch(){

const search =
document.getElementById("userSearch");


if(!search) return;


search.oninput=function(){


const value =
this.value.toLowerCase().trim();



const filtered =
users.filter(user=>{


return (

String(user["Name"] || "")
.toLowerCase()
.includes(value)


||

String(user["Email"] || "")
.toLowerCase()
.includes(value)


||

String(user["Username"] || "")
.toLowerCase()
.includes(value)


||

String(user["Role"] || "")
.toLowerCase()
.includes(value)


);


});


renderUsers(filtered);


};


}
