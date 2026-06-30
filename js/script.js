/*=========================================================
THE SECOND SELF
SCRIPT.JS
=========================================================*/

/*=========================================================
LOADER
=========================================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        },600);

    }

});


/*=========================================================
STICKY HEADER
=========================================================*/

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 50){

        header.classList.add("sticky");

    }else{

        header.classList.remove("sticky");

    }

});


/*=========================================================
SMOOTH SCROLL
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            window.scrollTo({

                top:target.offsetTop-90,

                behavior:"smooth"

            });

        }

    });

});


/*=========================================================
ACTIVE NAVIGATION
=========================================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        const sectionHeight=section.offsetHeight;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


/*=========================================================
MOBILE MENU
=========================================================*/

const menu=document.querySelector(".mobile-menu");

const nav=document.querySelector("nav");

if(menu){

menu.addEventListener("click",()=>{

nav.classList.toggle("showMenu");

menu.classList.toggle("active");

});

}


/*=========================================================
CLOSE MENU AFTER CLICK
=========================================================*/

navLinks.forEach(link=>{

link.addEventListener("click",()=>{

if(nav.classList.contains("showMenu")){

nav.classList.remove("showMenu");

menu.classList.remove("active");

}

});

});


/*=========================================================
GSAP REGISTER
=========================================================*/

if(typeof gsap !== "undefined"){

gsap.registerPlugin(ScrollTrigger);

}


/*=========================================================
AOS
=========================================================*/

if(typeof AOS !== "undefined"){

AOS.init({

duration:1000,

once:true,

offset:80

});

}
/*=========================================================
THE SECOND SELF
SCRIPT.JS
=========================================================*/

/*=========================================================
LOADER
=========================================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        },600);

    }

});


/*=========================================================
STICKY HEADER
=========================================================*/

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 50){

        header.classList.add("sticky");

    }else{

        header.classList.remove("sticky");

    }

});


/*=========================================================
SMOOTH SCROLL
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            window.scrollTo({

                top:target.offsetTop-90,

                behavior:"smooth"

            });

        }

    });

});


/*=========================================================
ACTIVE NAVIGATION
=========================================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        const sectionHeight=section.offsetHeight;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


/*=========================================================
MOBILE MENU
=========================================================*/

const menu=document.querySelector(".mobile-menu");

const nav=document.querySelector("nav");

if(menu){

menu.addEventListener("click",()=>{

nav.classList.toggle("showMenu");

menu.classList.toggle("active");

});

}


/*=========================================================
CLOSE MENU AFTER CLICK
=========================================================*/

navLinks.forEach(link=>{

link.addEventListener("click",()=>{

if(nav.classList.contains("showMenu")){

nav.classList.remove("showMenu");

menu.classList.remove("active");

}

});

});


/*=========================================================
GSAP REGISTER
=========================================================*/

if(typeof gsap !== "undefined"){

gsap.registerPlugin(ScrollTrigger);

}


/*=========================================================
AOS
=========================================================*/

if(typeof AOS !== "undefined"){

AOS.init({

duration:1000,

once:true,

offset:80

});

}
/*=========================================================
CURSOR GLOW
=========================================================*/

const glow=document.querySelector(".cursor-glow");

window.addEventListener("mousemove",(e)=>{

if(!glow) return;

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});
