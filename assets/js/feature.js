const mySwiper = new Swiper(".mySwiper", {
    effect: "cards",
    cardsEffect: {
      perSlideRotate: 20,
      rotate: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    gradCursor: true,
  });
  const bgColors = ["#0077f7, #73ff00","#63D5BC, #E8B43E","#765BBC, #ED6EB9","#343749, #E86847"];
  const positions = [0, 1, 2, 3];
  const texts = document.querySelectorAll(".swipper-text p");
  mySwiper.on("slideChange", function (e) {
    for (const pos of positions) {
      if (pos == e.activeIndex) {
        setTimeout(()=>{
          texts[pos].style.visibility = "visible";
        texts[pos].style.transform = "scale(1)";
        },500)
        
        texts[pos].style.background = "linear-gradient(to right,"+bgColors[pos]+")";
        texts[pos].style.webkitBackgroundClip = "text";
        texts[pos].style.backgroundClip = "text";
        texts[pos].style.mozBackground = "text";
      } else {
        texts[pos].style.visibility = "hidden";
        texts[pos].style.transform = "scale(0)";
        // texts[pos].style.background = "transparent";
      }
    }
  });