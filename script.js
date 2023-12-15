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

/*carousel*/

const buttonPrev = document.getElementById('button-prev');
const buttonNext = document.getElementById('button-next');
const track = document.getElementById('track');
const slickList = document.getElementById('slick-list');
const slick = document.querySelectorAll('.slick');

const slickWidth = slick[0].offsetWidth;

buttonPrev.onclick = () => Move(1);
buttonNext.onclick = () => Move(2);

function Move(value) {
    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;

    track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

    if(leftPosition < (trackWidth - listWidth) && value == 2) {
        track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    }else if(leftPosition > 0 && value == 1) {
        track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}

/*fin de Carousel*/