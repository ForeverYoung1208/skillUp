'use strict';

const block = document.querySelector('.block');
const text = document.querySelector('.text');

// offset
// offsetParent (body | positioned node)
// console.log('[block.offsetParent]', block.offsetParent);

// offsetTop, offsetLeft
// console.log('[block.offsetTop]', block.offsetTop);
// console.log('[block.offsetLeft]', block.offsetLeft);

// offsetWidth, offsetHeight
// console.log('[block.offsetWidth]', block.offsetWidth);
// console.log('[block.offsetHeight]', block.offsetHeight);

// client
// clientTop, clientLeft
// console.log('[block.clientTop]', block.clientTop);
// console.log('[block.clientLeft]', block.clientLeft);

// clientWidth, clientHeight
// console.log('[block.clientWidth]', block.clientWidth);
// console.log('[block.clientHeight]', block.clientHeight);
// console.log('-----------------------------------------');
// console.log('[text.clientWidth]', text.clientWidth);
// console.log('[text.clientHeight]', text.clientHeight);

// scroll
// scrollTop, scrollLeft
// setTimeout(() => {
//     console.log('[text.scrollTop]', text.scrollTop);
//     console.log('[text.scrollLeft]', text.scrollLeft);
// }, 2000);

// scrollWidth, scrollHeight
// console.log('[text.scrollWidth]', text.scrollWidth);
// console.log('[text.scrollHeight]', text.scrollHeight);
// console.log('[text.clientHeight]', text.clientHeight);

// setInterval(() => {
//     text.scrollTop += 50;
// }, 1000);

// window
// console.log('[window.innerWidth]', window.innerWidth);
// console.log('[window.innerHeight]', window.innerHeight);

const html = document.documentElement;

const h1 = document.querySelector('h1');

// console.log('[h1.offsetTop]', h1.offsetTop);
// console.log('[html.scrollTop]', html.scrollTop);

// window.scrollBy, window.scrollTo

// setTimeout(() => {
//     // window.scrollBy(250, 250);
//     window.scrollTo(250, 250);
// }, 2000);

// scrollIntoView
// setTimeout(() => {
//     h1.scrollIntoView(false);
// }, 2000);

// getBoundingClientRect
// const coords = h1.getBoundingClientRect();

// elementFromPoint
const result = document.elementFromPoint(500, 500);
