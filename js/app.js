// import inputIcon from "./base/input.js";

// const inputIcon = $('.t-input');
// inputIcon.attr('size', `${inputIcon.attr('placeholder').length}px`);


const inputElement = document.querySelectorAll('.t-input');

for(let input of inputElement) {
    input.setAttribute('size',input.getAttribute('placeholder').length);
}
