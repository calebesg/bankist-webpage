'use strict';

const nav = document.querySelector('.nav');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const section1 = document.getElementById('section--1');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnLearnMore = document.querySelector('.btn--scroll-to');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

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

//////////////////////////////////////////////////////
// IMPLEMENTING SMOOTH SCROLL

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

/////////////////////////////////////////////////////
// MENU FADE EFFECT

const handlerHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link') === false) return;

  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');

  siblings.forEach(el => el !== link && (el.style.opacity = opacity));
  logo.style.opacity = opacity;
};

nav.addEventListener('mouseover', e => handlerHover(e, 0.5));

nav.addEventListener('mouseout', e => handlerHover(e, 1));

/////////////////////////////////////////////////////
// TABBED COMPONENT

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  if (clicked === null) return;

  // REMOVE ACTIVE STATE
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
