gsap.registerPlugin(ScrollTrigger);
// ==========================
// AOS
// ==========================
AOS.init({
    duration:1000,
    once:true
});

// ==========================
// LOADER
// ==========================
window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    loader.style.opacity="0";
    loader.style.visibility="hidden";

    setTimeout(()=>{
        loader.remove();
    },600);

});

// ==========================
// STICKY NAVBAR
// ==========================
const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        header.style.background="rgba(0,0,0,.88)";
        header.style.padding="18px 7%";
        header.style.boxShadow="0 10px 40px rgba(0,0,0,.45)";

    }else{

        header.style.background="rgba(0,0,0,.15)";
        header.style.padding="22px 7%";
        header.style.boxShadow="none";

    }

});

// ==========================
// GSAP INTRO
// ==========================

gsap.from(".logo",{

opacity:0,
y:-40,
duration:1

});

gsap.from("nav li",{

opacity:0,
y:-20,
duration:0.7,
stagger:.1,
delay:.4

});

gsap.from(".btn-ticket",{

opacity:0,
x:50,
duration:1,
delay:.8

});

gsap.from(".hero-left h4",{

opacity:0,
x:-80,
duration:.8

});

gsap.from(".hero-left h1",{

opacity:0,
x:-120,
duration:1,
delay:.2

});

gsap.from(".hero-left p",{

opacity:0,
y:50,
duration:1,
delay:.6

});

gsap.from(".hero-buttons",{

opacity:0,
y:50,
duration:1,
delay:1

});

gsap.from(".hero-right img",{

opacity:0,
scale:.7,
duration:1.4,
delay:.5

});

// ==========================
// FLOAT MIC
// ==========================

gsap.to(".hero-right img",{

y:20,

repeat:-1,

yoyo:true,

ease:"power1.inOut",

duration:3

});

// ==========================
// PARTICLES
// ==========================

particlesJS("particles-js",{

particles:{

number:{
value:80
},

color:{
value:"#d72638"
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
color:"#d72638",
opacity:.25,
width:1
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
distance:170
},

push:{
particles_nb:5
}

}

},

retina_detect:true

});

// ==========================
// BUTTON HOVER
// ==========================

document.querySelectorAll("a").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

gsap.to(btn,{

scale:1.05,
duration:.25

});

});

btn.addEventListener("mouseleave",()=>{

gsap.to(btn,{

scale:1,
duration:.25

});

});

});

// ==========================
// PARALLAX
// ==========================

window.addEventListener("mousemove",(e)=>{

let x=(window.innerWidth/2-e.pageX)/35;
let y=(window.innerHeight/2-e.pageY)/35;

gsap.to(".hero-right img",{

x:x,
y:y,
duration:1

});

});

// ==========================
// RED LIGHT MOTION
// ==========================

gsap.to(".one",{

x:80,
y:40,

duration:6,

repeat:-1,

yoyo:true,

ease:"sine.inOut"

});

gsap.to(".two",{

x:-80,
y:-50,

duration:8,

repeat:-1,

yoyo:true,

ease:"sine.inOut"

});

// ==========================
// TEXT GLOW
// ==========================

setInterval(()=>{

document.querySelector(".hero-left span").classList.toggle("activeGlow");

},2000);

// ==========================
// SCROLL PROGRESS
// ==========================

const progress=document.createElement("div");

progress.style.position="fixed";
progress.style.top="0";
progress.style.left="0";
progress.style.height="4px";
progress.style.width="0";
progress.style.background="#d72638";
progress.style.zIndex="999999";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

let total=document.documentElement.scrollHeight-window.innerHeight;

let percent=(window.scrollY/total)*100;

progress.style.width=percent+"%";

});

// ==========================
// BACK TO TOP
// ==========================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.className="topBtn";

document.body.appendChild(topBtn);

Object.assign(topBtn.style,{

position:"fixed",
bottom:"30px",
right:"30px",
width:"50px",
height:"50px",
border:"none",
borderRadius:"50%",
background:"#d72638",
color:"#fff",
cursor:"pointer",
display:"none",
fontSize:"22px",
zIndex:"999"

});

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

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

// Feature Card Animation
gsap.from(".feature-card",{

opacity:0,

y:80,

duration:1,

stagger:0.2,

scrollTrigger:{
trigger:".features",
start:"top 80%"
}

});
