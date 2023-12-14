const nav = document.querySelector('#nav');
const abrir = document.querySelector('#abrir');
const cerrar = document.querySelector('#cerrar');

abrir.addEventListener('click', () => {
	nav.classList.add('visible');
});

cerrar.addEventListener('click', () => {
    nav.classList.remove('visible');
});

/*.slider*/

let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let legthItems = items.length - 1;

next.onclick = function() {
    if(active + 1 > legthItems) {
        active = 0;
    } else {
        active++;
    }

    reloadSlider();
}

prev.onclick = function() {
    if(active - 1 < 0) {
        active = legthItems;
    }else {
        active--;
    }
    reloadSlider();
}

let refreshSlider = setInterval(()=>{next.click()},5000);

function reloadSlider() {
    let checkleft = items[active].offsetLeft;
    list.style.left = -checkleft + 'px';

    let lastActiveDot = document.querySelector('.slider .dots li.active');
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');
    clearInterval(refreshSlider);
    refreshSlider = setInterval(()=>{next.click()},5000);
}

dots.forEach((Li,key)=> {
    Li.addEventListener('click', function() {
        active = key;
        reloadSlider();
    } )
})