'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const section1 = document.getElementById('section--1');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnLearnMore = document.querySelector('.btn--scroll-to');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// IMPLEMENTING SMOOTH SCROLL
//////////////////////////////////////////////////////
document.querySelector('.nav__links').addEventListener('click', e => {
  if (e.target.classList.contains('nav__link') === false) return -1;

  e.preventDefault();

  const id = e.target.getAttribute('href');

  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

btnLearnMore.addEventListener('click', event => {
  const { left, top } = section1.getBoundingClientRect();

  console.log('X/Y: ', window.pageXOffset, window.pageYOffset);

  window.scrollTo({
    left: left + window.pageXOffset,
    top: top + window.pageYOffset,
    behavior: 'smooth',
  });

  // EXPERIMENTAL
  // section1.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
