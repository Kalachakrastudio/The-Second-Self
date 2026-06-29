// ===============================
// AOS Initialization
// ===============================

AOS.init({
    duration:1000,
    once:true,
    easing:"ease-in-out"
});


// ===============================
// Loader
// ===============================

window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    loader.style.opacity="0";

    loader.style.visibility="hidden";

    loader.style.transition=".6s";

});


// ===============================
// Sticky Header
// ===============================

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>80){

        header.style.background="rgba(0,0,0,.95)";
        header.style.padding="15px 8%";
        header.style.boxShadow="0 10px 35px rgba(0,0,0,.4)";

    }

    else{

        header.style.background="rgba(0,0,0,.35)";
        header.style.padding="18px 8%";
        header.style.boxShadow="none";

    }

});


// ===============================
// GSAP Hero Animation
// ===============================

gsap.from(".logo",{

    y:-50,
    opacity:0,
    duration:1

});

gsap.from("nav ul li",{

    y:-30,
    opacity:0,
    duration:.8,
    stagger:.12,
    delay:.4

});

gsap.from(".ticket-btn",{

    opacity:0,
    x:80,
    duration:1,
    delay:.8

});

gsap.from(".hero-left h1",{

    opacity:0,
    y:100,
    duration:1.2

});

gsap.from(".hero-left p",{

    opacity:0,
    y:60,
    duration:1,
    delay:.4

});

gsap.from(".buttons",{

    opacity:0,
    y:60,
    duration:1,
    delay:.8

});

gsap.from(".hero-right img",{

    opacity:0,
    scale:.7,
    duration:1.4,
    delay:.5

});


// ===============================
// Floating Hero Image
// ===============================

gsap.to(".hero-right img",{

    y:20,

    repeat:-1,

    yoyo:true,

    duration:3,

    ease:"power1.inOut"

});


// ===============================
// Card Hover Effect
// ===============================

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

gsap.to(card,{

scale:1.04,

duration:.3

});

});

card.addEventListener("mouseleave",()=>{

gsap.to(card,{

scale:1,

duration:.3

});

});

});


// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


// ===============================
// Scroll Progress Bar
// ===============================

const progress=document.createElement("div");

progress.style.position="fixed";

progress.style.top="0";

progress.style.left="0";

progress.style.height="4px";

progress.style.background="#d81f26";

progress.style.width="0%";

progress.style.zIndex="99999";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const totalHeight=

document.documentElement.scrollHeight-window.innerHeight;

const progressHeight=(window.pageYOffset/totalHeight)*100;

progress.style.width=progressHeight+"%";

});


// ===============================
// Particles
// ===============================

particlesJS("particles",{

particles:{

number:{
value:70
},

color:{
value:"#d81f26"
},

shape:{
type:"circle"
},

opacity:{
value:.35
},

size:{
value:3
},

line_linked:{
enable:true,
distance:150,
color:"#d81f26",
opacity:.25
},

move:{
enable:true,
speed:2
}

},

interactivity:{

events:{

onhover:{
enable:true,
mode:"grab"
},

onclick:{
enable:true,
mode:"push"
}

},

modes:{

grab:{
distance:180
},

push:{
particles_nb:5
}

}

},

retina_detect:true

});


// ===============================
// Active Navigation
// ===============================

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-120;

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


// ===============================
// Button Ripple
// ===============================

document.querySelectorAll("button,.ticket-btn").forEach(btn=>{

btn.addEventListener("click",function(e){

let circle=document.createElement("span");

circle.classList.add("ripple");

this.appendChild(circle);

let x=e.clientX-this.offsetLeft;

let y=e.clientY-this.offsetTop;

circle.style.left=x+"px";
circle.style.top=y+"px";

setTimeout(()=>{

circle.remove();

},600);

});

});


// ===============================
// Back To Top Button
// ===============================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.className="topButton";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.bottom="30px";
topBtn.style.right="30px";
topBtn.style.width="50px";
topBtn.style.height="50px";
topBtn.style.borderRadius="50%";
topBtn.style.border="none";
topBtn.style.background="#d81f26";
topBtn.style.color="white";
topBtn.style.cursor="pointer";
topBtn.style.display="none";
topBtn.style.fontSize="20px";
topBtn.style.zIndex="999";

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};


// ===============================
// Console Message 😄
// ===============================

console.log("%cThe Second Self","font-size:30px;color:#d81f26;font-weight:bold;");
console.log("Website Designed with ❤️");
