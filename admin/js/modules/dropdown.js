function rebuildCustomSelect(id){
    console.log("Dropdown rebuild:", id);

    const select=document.getElementById(id);
if(!select || !select.options || select.options.length===0){
    console.log("Skip dropdown:",id);
    return;
}

    if(!select) return;

    if(select.parentElement.classList.contains("custom-select")){

        const old=select.parentElement;

        old.parentNode.insertBefore(select,old);

        old.remove();

    }

    const wrapper=document.createElement("div");

    wrapper.className="custom-select";

    select.parentNode.insertBefore(wrapper,select);

    wrapper.appendChild(select);

    const selected=document.createElement("div");

    selected.className="select-selected";

   if (select.selectedIndex < 0 && select.options.length > 0) {
    select.selectedIndex = 0;
}

let currentIndex = select.selectedIndex;


if(
    currentIndex < 0 ||
    !select.options[currentIndex]
){

    currentIndex = 0;

    select.selectedIndex = 0;

}


selected.textContent =
select.options[currentIndex]
? select.options[currentIndex].text
: "";

    wrapper.appendChild(selected);

    const list=document.createElement("div");

    list.className="select-items";
if(select.options.length===0){
    return;
}
    if(!select.options || select.options.length === 0){

    console.log("No options found for:", id);

    return;

}


for(let i=0;i<select.options.length;i++){

        const item=document.createElement("div");

        item.textContent=select.options[i].text;

        if(i===select.selectedIndex){

            item.classList.add("same-as-selected");

        }

        item.onclick=function(){

            select.selectedIndex=i;
            select.value = select.options[i].value;

            selected.textContent=this.textContent;

            list.querySelectorAll("div")
            .forEach(x=>x.classList.remove("same-as-selected"));

            this.classList.add("same-as-selected");

            list.classList.remove("show");

            selected.classList.remove("active");

            select.dispatchEvent(new Event("change"));

        };

        list.appendChild(item);

    }

    wrapper.appendChild(list);

    selected.onclick=function(e){

        e.stopPropagation();

        document.querySelectorAll(".select-items")
        .forEach(x=>{

            if(x!==list){

                x.classList.remove("show");

            }

        });

        document.querySelectorAll(".select-selected")
        .forEach(x=>{

            if(x!==selected){

                x.classList.remove("active");

            }

        });

        list.classList.toggle("show");

        selected.classList.toggle("active");

    };

}

document.addEventListener("click",function(){

    document.querySelectorAll(".select-items")
    .forEach(x=>x.classList.remove("show"));

    document.querySelectorAll(".select-selected")
    .forEach(x=>x.classList.remove("active"));

});
