// swiper-works.js
document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.works__swiper--top', {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: '.works__nav--top-next',
      prevEl: '.works__nav--top-prev',
    },
    loop: false,
  });

  new Swiper('.works__swiper--bottom', {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: '.works__nav--bottom-next',
      prevEl: '.works__nav--bottom-prev',
    },
    loop: false,
  });
});