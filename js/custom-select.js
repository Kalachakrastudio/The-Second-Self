document.querySelectorAll("select").forEach(select => {

    const wrapper = document.createElement("div");
    wrapper.className = "custom-select";

    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);

    const selected = document.createElement("div");
    selected.className = "select-selected";
    selected.textContent = select.options[select.selectedIndex].textContent;

    wrapper.appendChild(selected);

    const options = document.createElement("div");
    options.className = "select-items";

    [...select.options].forEach((option,index)=>{

        if(index===0) return;

        const item=document.createElement("div");

        item.textContent=option.textContent;

        item.addEventListener("click",()=>{

            select.selectedIndex=index;

            selected.textContent=option.textContent;
            
            select.dispatchEvent(new Event("change"));

            wrapper.classList.remove("active");

        });

        options.appendChild(item);

    });

    wrapper.appendChild(options);

    selected.addEventListener("click",(e)=>{

        e.stopPropagation();

        document.querySelectorAll(".custom-select")
            .forEach(drop=>{
                if(drop!==wrapper){
                    drop.classList.remove("active");
                }
            });

        wrapper.classList.toggle("active");

    });

});

document.addEventListener("click",()=>{

    document.querySelectorAll(".custom-select")
        .forEach(drop=>{

            drop.classList.remove("active");

        });

});
//=========================================
// Reset Custom Select
//=========================================

function resetCustomSelect(selectId){

    const select = document.getElementById(selectId);

    if(!select) return;

    // Reset actual select
    select.selectedIndex = 0;

    // Update custom text
    const wrapper = select.parentElement;
    const selected = wrapper.querySelector(".select-selected");

    selected.textContent =
    select.options[0].textContent;

    // Trigger change event
    select.dispatchEvent(new Event("change"));

}
