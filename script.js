let mainSliderSelector = '.main-slider', navSliderSelector = '.nav-slider', interleaveOffset = 0.5;

let hiddenElement1 = document.getElementById("projects");
let hiddenElement2 = document.getElementById("about");

var swiper = new Swiper(".mySwiper", {
    loop: true, spaceBetween: 10, slidesPerView: 4, freeMode: true, watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
    loop: true, spaceBetween: 10, navigation: {
        nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev",
    }, thumbs: {
        swiper: swiper,
    },
});

//content
function goToProjects() {
    hiddenElement1.scrollIntoView({block: "start", behavior: "smooth"});
}

function goToAbout() {
    hiddenElement2.scrollIntoView({block: "center", behavior: "smooth"});
}

function deleteLabel() {
    setTimeout(() => {
        let len = document.getElementsByTagName('a').length - 1;
        document.getElementsByTagName('a')[len].style.display = "none"

        let len1 = document.getElementsByTagName('img').length - 1;
        document.getElementsByTagName('img')[len1].style.display = "none"

        console.log('deleted');
    }, 2000);

}

deleteLabel()

//loader
function onReady(callback) {
    var intervalId = window.setInterval(function () {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 1000);
}

function setVisible(selector, visible) {
    setTimeout(() => {
        if (selector === "#loading") {
            document.querySelector(selector).style.display = visible ? 'block' : 'none';
        } else {
            document.querySelector(selector).style.opacity = visible ? '1' : '0';
            document.querySelector(selector).style.height = visible ? 'auto' : '100vh';
            document.querySelector(selector).style.overflow = 'auto';
        }
    }, 3000);
}

onReady(function () {
    setVisible('.page', true);
    setVisible('#loading', false);
});