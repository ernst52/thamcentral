// ─── SLIDESHOW ────────────────────────────────────────
//All the pictures with slide class now are'nt visible by .slide { opacity: 0; } in css
const slides = document.querySelectorAll('.slide'); //Select all elements with the class 'slide' and store them in the 'slides' variable | slides[0,1...4]
let current = 0; //Initialize the 'current' index to 0

slides[current].classList.add('active'); //Add the 'active' class to the first slide class (slides[0]) , which will make it visible by css | .slide.active { opacity: 1; }

setInterval(() => { //Set an interval to execute the following code every 4 seconds
    slides[current].classList.remove('active'); //Remove the 'active' class from the current slide to make the current slide(slides[0]) invisible again
    current = (current + 1) % slides.length;//+ the current index by 1 and loop back to index 0 when it reaches the end of the slides array with % slides.length (= 5) 
    slides[current].classList.add('active');//Add the 'active' class to the next slide to make it visible again
}, 4000);