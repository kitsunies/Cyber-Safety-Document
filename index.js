const $ = id => document.getElementById(id);

const matches = (el, selector) => (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);

const debounce = function(fn, wait) {
    let timeout = null;
    return function() {
        if (timeout) {
            clearTimeout(timeout);
        }

        return timeout = setTimeout(function() {
            timeout = null;
            return fn();
        }, wait);
    };
};

const closest = function(el, selector) {
    while (true) {
        if (matches(el, selector)) {
            return el;
        }
        el = el.parentNode;
        if (el === document) {
            return null;
        }
    }
};

const remove_lightbox = function(e) {
    document.body.classList.remove("show_lightbox");
    document.body.classList.remove("animate_lightbox");
    return (e != null ? e.preventDefault() : undefined);
};

document.body.addEventListener("click", function(e) {
    if (matches(e.target, ".shroud") || matches(e.target, ".lightbox .close_btn")) {
        remove_lightbox(e);
        return;
    }

    const button = closest(e.target, ".text_btn");
    if (!button) { return; }

    const container = closest(button, "[data-info]");

    const title = container.innerHTML
    document.querySelector(".lightbox .title").innerHTML = title;

    const body = container.dataset.info;
    document.querySelector(".lightbox .body").innerHTML = body;

    document.body.classList.add("show_lightbox");
    document.querySelector(".shroud").scrollTop = 0;
    setTimeout(() => document.body.classList.add("animate_lightbox"), 1);

    return e.preventDefault();
});


window.addEventListener("keydown", function(e) {
    if (e.keyCode === 27) {
        return remove_lightbox(e);
    }
});

var slideIndexes = [];
var slideContainers = document.getElementsByClassName("slideshow-container");
for (const el of slideContainers) {
    slideIndexes[el.id] = 1
    showSlides(el.id, 1);
}

function plusSlides(id, n) {
    showSlides(id, slideIndexes[id] += n);
}

function showSlides(id, n) {
    var i;
    var slides = document.getElementById(id).getElementsByClassName("slideshow");
    if (n > slides.length) {slideIndexes[id] = 1}
    if (n < 1) {slideIndexes[id] = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndexes[id]-1].style.display = "block";
}

function __guard__(value, transform) {
    return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}