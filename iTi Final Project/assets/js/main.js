/*******************nav bar ******************* */
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector("nav").classList.add("scroll");
  } else {
    document.querySelector("nav").classList.remove("scroll");
  }
}
/**********************Market section  ***********************************/
// const cardsContainer = document.querySelector('.cards-container');
// const scrollLeftButton = document.querySelector('.scroll-left-button');
// const scrollRightButton = document.querySelector('.scroll-right-button');

// const cardWidth = document.querySelector('.card-item').offsetWidth; // assume all cards have same width
// const numCards = document.querySelectorAll('.card-item').length;
// const containerWidth = cardWidth * numCards;

// cardsContainer.style.width = `${containerWidth}px`;

// let currentPosition = 0;
// const step = cardWidth + 20; // 20px for margin-right

// scrollLeftButton.addEventListener('click', () => {
//   currentPosition = Math.max(currentPosition - step, 0);
//   cardsContainer.scrollLeft = currentPosition;
// });

// scrollRightButton.addEventListener('click', () => {
//   currentPosition = Math.min(currentPosition + step, containerWidth - cardsContainer.offsetWidth);
//   cardsContainer.scrollLeft = currentPosition;
// });


/*********************Counter Animation*********************/
const counters = document.querySelectorAll('.count');
const speed = 200; // The lower the slower

counters.forEach(counter => {
  const updateCount = () => {
    const target = parseInt(counter.getAttribute('data-target'));
    const count = parseInt(counter.innerText);

    const inc = Math.ceil(target / speed);

    if (count < target) {
      counter.innerText = count + inc;
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target + "+";
    }
  };

  updateCount();
});
/**************************************reviews section******************************/
const slides = document.querySelectorAll(".slide");

let index = 0;

function changeSlide() {
  slides[index].classList.remove("active");

  index++;

  if (index === slides.length) {
    index = 0;
  }

  slides[index].classList.add("active");
}

setInterval(changeSlide, 5000);
