/*=========================================================
THE SECOND SELF
SCRIPT.JS
=========================================================*/

/*=========================================================
LOADER
=========================================================*/

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (!loader) return;

    loader.style.opacity = "0";

    loader.style.visibility = "hidden";

    loader.style.pointerEvents = "none";

    setTimeout(() => {

        loader.remove();

    }, 600);

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
/*=========================================================
ANIMATED COUNTERS
=========================================================*/

const counters = document.querySelectorAll(".stat h2");

const counterObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter = entry.target;

const target = parseInt(counter.innerText);

let count = 0;

const speed = target/100;

const update = ()=>{

count += speed;

if(count < target){

counter.innerText = Math.ceil(count)+"+";

requestAnimationFrame(update);

}else{

counter.innerText = target+"+";

}

}

update();

counterObserver.unobserve(counter);

});

},{threshold:.5});

counters.forEach(counter=>{

counterObserver.observe(counter);

});


/*=========================================================
GALLERY FILTER
=========================================================*/

const filterButtons = document.querySelectorAll(".gallery-filter button");

const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

const filter = button.innerText.toLowerCase();

galleryItems.forEach(item=>{

const category = item.dataset.category;

if(filter==="all"){

item.style.display="block";

setTimeout(()=>{

item.style.opacity=1;

item.style.transform="scale(1)";

},100);

}else{

if(category===filter){

item.style.display="block";

setTimeout(()=>{

item.style.opacity=1;

item.style.transform="scale(1)";

},100);

}else{

item.style.opacity=0;

item.style.transform="scale(.8)";

setTimeout(()=>{

item.style.display="none";

},300);

}

}

});

});

});


/*=========================================================
BACK TO TOP BUTTON
=========================================================*/

const topButton=document.createElement("div");

topButton.className="backToTop";

topButton.innerHTML='<i class="fas fa-arrow-up"></i>';

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topButton.classList.add("show");

}else{

topButton.classList.remove("show");

}

});

topButton.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});


/*=========================================================
READING PROGRESS BAR
=========================================================*/

const progress=document.createElement("div");

progress.className="progressBar";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const scroll=window.scrollY;

const height=document.documentElement.scrollHeight-window.innerHeight;

progress.style.width=(scroll/height)*100+"%";

});


/*=========================================================
SPONSOR HOVER
=========================================================*/

document.querySelectorAll(".partner-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px) scale(1.03)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});


/*=========================================================
FEATURE CARD EFFECT
=========================================================*/

document.querySelectorAll(".feature-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.background=

`radial-gradient(circle at ${x}px ${y}px,

rgba(215,31,40,.18),

rgba(255,255,255,.03))`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="rgba(255,255,255,.03)";

});

});


/*=========================================================
NAVBAR HIDE ON SCROLL DOWN
=========================================================*/

let lastScroll=0;

window.addEventListener("scroll",()=>{

const current=window.pageYOffset;

if(current>lastScroll && current>120){

header.style.transform="translateY(-100%)";

}else{

header.style.transform="translateY(0)";

}

lastScroll=current;

});


/*=========================================================
PAGE READY
=========================================================*/

console.log("The Second Self Loaded Successfully");

/*=========================================================
GALLERY LIGHTBOX
=========================================================*/

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.createElement("div");
lightbox.className = "lightbox";

lightbox.innerHTML = `
<div class="lightbox-content">

    <span class="lightbox-close">&times;</span>

    <img src="" alt="Gallery Image">

</div>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");

galleryImages.forEach(image=>{

image.addEventListener("click",()=>{

lightbox.classList.add("show");

lightboxImage.src=image.src;

});

});

lightboxClose.addEventListener("click",()=>{

lightbox.classList.remove("show");

});

lightbox.addEventListener("click",(e)=>{

if(e.target===lightbox){

lightbox.classList.remove("show");

}

});


/*=========================================================
ESC KEY CLOSE
=========================================================*/

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

lightbox.classList.remove("show");

}

});


/*=========================================================
HERO PARTICLES
=========================================================*/

if(typeof particlesJS!=="undefined"){

particlesJS("particles-js",{

particles:{

number:{

value:60

},

color:{

value:"#D71F28"

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

move:{

speed:2

},

line_linked:{

enable:true,

color:"#D71F28",

opacity:.15

}

}

});

}


/*=========================================================
TEXT REVEAL
=========================================================*/

if(typeof gsap!=="undefined"){

gsap.utils.toArray(".section-heading h2").forEach(title=>{

gsap.from(title,{

y:80,

opacity:0,

duration:1,

ease:"power4.out",

scrollTrigger:{

trigger:title,

start:"top 85%"

}

});

});

}


/*=========================================================
FLOATING FEATURE ICONS
=========================================================*/

document.querySelectorAll(".feature-icon").forEach((icon,index)=>{

if(typeof gsap!=="undefined"){

gsap.to(icon,{

y:-10,

duration:2+index*.3,

repeat:-1,

yoyo:true,

ease:"sine.inOut"

});

}

});


/*=========================================================
IMAGE PARALLAX
=========================================================*/

window.addEventListener("scroll",()=>{

const scroll=window.pageYOffset;

document.querySelectorAll(".gallery-item img").forEach(img=>{

img.style.transform=`translateY(${scroll*.04}px) scale(1.08)`;

});

});


/*=========================================================
BUTTON RIPPLE
=========================================================*/

document.querySelectorAll(".btn-primary").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

ripple.className="ripple";

const rect=this.getBoundingClientRect();

ripple.style.left=e.clientX-rect.left+"px";

ripple.style.top=e.clientY-rect.top+"px";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});


/*=========================================================
NAVBAR BLUR
=========================================================*/

window.addEventListener("scroll",()=>{

if(window.scrollY>120){

header.style.backdropFilter="blur(25px)";

}else{

header.style.backdropFilter="blur(18px)";

}

});


/*=========================================================
PREVENT IMAGE DRAG
=========================================================*/

document.querySelectorAll("img").forEach(img=>{

img.setAttribute("draggable","false");

});


/*=========================================================
PRELOADER TEXT
=========================================================*/

const loaderText=document.querySelector(".loader-text");

if(loaderText){

const words=[

"Preparing Stage",

"Loading Performers",

"Setting Lights",

"Almost Ready"

];

let i=0;

setInterval(()=>{

loaderText.innerText=words[i];

i++;

if(i>=words.length){

i=0;

}

},1000);

}


/*=========================================================
END
=========================================================*/

console.log("Premium Event Website Loaded Successfully");
