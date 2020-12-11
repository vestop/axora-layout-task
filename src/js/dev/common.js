/* eslint-disable require-jsdoc */
$(document).ready(function() {
  $('.toogle-button').click(function() {
    animateCSS('.goods-card:nth-child(1)', 'flipInY');
    animateCSS('.goods-card:nth-child(2)', 'flipInY');
    animateCSS('.goods-card:nth-child(3)', 'flipInY');
    $('.goods-cards').prepend($('.goods-card:last').detach());
  });

  $('.toogle-button').mousedown(function() {
    $('.toogle-button').addClass('toogle-button_push');
  });

  $('.toogle-button').mouseup(function() {
    $('.toogle-button').removeClass('toogle-button_push');
  });
});


function animateCSS(element, animationName, callback) {
  const node = document.querySelector(element);
  node.classList.add('animated', animationName);

  function handleAnimationEnd() {
    node.classList.remove('animated', animationName);
    node.removeEventListener('animationend', handleAnimationEnd);

    if (typeof callback === 'function') callback();
  }

  node.addEventListener('animationend', handleAnimationEnd);
}
