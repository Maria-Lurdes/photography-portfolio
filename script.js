// slider-script
// Params

    let mainSliderSelector = '.main-slider',
    navSliderSelector = '.nav-slider',
    interleaveOffset = 0.5;

    let hiddenElement1 = document.getElementById("projects");
    let hiddenElement2 = document.getElementById("about");


// Main Slider
let mainSliderOptions = {
      loop: true,
      speed:1000,
      autoplay:{
        delay:3000
      },
      loopAdditionalSlides: 10,
      grabCursor: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        init: function(){
          this.autoplay.stop();
        },
        imagesReady: function(){
          this.el.classList.remove('loading');
          this.autoplay.start();
        },
        slideChangeTransitionEnd: function(){
          let swiper = this,
              captions = swiper.el.querySelectorAll('.caption');
          for (let i = 0; i < captions.length; ++i) {
            captions[i].classList.remove('show');
          }
          swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
        },
        progress: function(){
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            let slideProgress = swiper.slides[i].progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;
           
            swiper.slides[i].querySelector(".slide-bgimg").style.transform =
              "translateX(" + innerTranslate + "px)";
          }
        },
        touchStart: function() {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },
        setTransition: function(speed) {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(".slide-bgimg").style.transition =
              speed + "ms";
          }
        }
      }
    };

        let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);        


// Navigation Slider
let navSliderOptions = {
      loop: true,
      loopAdditionalSlides: 10,
      speed:1000,
      spaceBetween: 5,
      slidesPerView: 5,
      centeredSlides : true,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      direction: 'vertical',
      on: {
        imagesReady: function(){
          this.el.classList.remove('loading');
        },
        click: function(){
          mainSlider.autoplay.stop();
        }
      }
    };
    
        let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;


//content
function goToProjects() {
    hiddenElement1.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  function goToAbout() {
    hiddenElement2.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  function deleteLabel(){
    setTimeout(() => {
      let len =  document.getElementsByTagName('a').length -1;
    document.getElementsByTagName('a')[len].style.display = "none"

    let len1 =  document.getElementsByTagName('img').length -1;
    document.getElementsByTagName('img')[len1].style.display = "none"

    console.log('deleted');
    }, 2000);
    
  }

  deleteLabel()

//loader
function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}

function setVisible(selector, visible) {
  setTimeout(() => {
    if(selector === "#loading"){
      document.querySelector(selector).style.display = visible ? 'block' : 'none';
      }else{
        document.querySelector(selector).style.opacity = visible ? '1' : '0';
      }
  }, 3000);
}

onReady(function() {
  setVisible('.page', true);
  setVisible('#loading', false);
});