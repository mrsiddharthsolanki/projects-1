function locomotiveAnimemation(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locomotiveAnimemation()

function navbarAnimemation() {
    gsap.to(".navbar-part1 svg",{
        transform: "translateY(-100%)",
        ScrollTrigger:{
            trigger:".page-1",
            scroller:".main",
            start:"top 0",
            markers:true,
            end:"top -100%",
            scrub:true
        }
    })
    gsap.to(".navbar-part2 .links",{
        transform: "translateY(-100%)",
        opacity:0,
        ScrollTrigger:{
            trigger:".page-2",
            scroller:"main",
            start:"top 0",
            markers:true,
            end:"top -10%",
            scrub:true
        }
    })
}
navbarAnimemation() 

function videoconanimemation() {
    var videocon = document.querySelector(".video-box")
    var playbtn = document.querySelector(".video-play")

    videocon.addEventListener("mouseenter",function(){
        gsap.to(playbtn,{
            scale:1,
            opacity:1
        });
    });

    videocon.addEventListener("mouseleave",function(){
        gsap.to(playbtn,{
            scale:0,
            opacity:0
        });
    });

    videocon.addEventListener("mousemove",function(dets){
            gsap.to(playbtn,{
                left:dets.x-70,
                top:dets.y-50
            });
    });
}
videoconanimemation()

function lodingAnimemation(){
    document.addEventListener("DOMContentLoaded", function() {
        gsap.from(".page-1 h1", {
            y: 100,
            opacity: 0,
            delay: 0.5,
            duration: 0.5,
            stagger: 0.2
        });
    
        gsap.from(".video-box", {
            scale:0.9,
            opacity: 0,
            delay: 1,
            duration: 0.5
        });
    });
}
lodingAnimemation()

function cursorAnimemation() {
    document.querySelectorAll(".child").forEach(function(elem) {
        elem.addEventListener("mouseenter", function() {
            gsap.to(".cursor", {
                scale: 1,
            });
        });
        elem.addEventListener("mouseleave", function() {
            gsap.to(".cursor", {
                scale: 0,
            });
        });
    });
    
    document.addEventListener("mousemove", function(e) {
        gsap.to(".cursor", {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
        });
    });
}


gsap.from(".fade-in", {
    duration: 1.5,
    opacity: 0,
    y: 30,
    stagger: 0.2
});


