/*********PARTE JAVASCRIPT DEL HEADER******************/

// Selecciona el elemento del DOM con el id 'nav' y lo almacena en la variable 'nav'
const nav = document.querySelector('#nav');

// Selecciona el elemento del DOM con el id 'abrir' y lo almacena en la variable 'abrir'
const abrir = document.querySelector('#abrir');

// Selecciona el elemento del DOM con el id 'cerrar' y lo almacena en la variable 'cerrar'
const cerrar = document.querySelector('#cerrar');

// Agrega un evento de escucha al elemento con id 'abrir', que se activa cuando se hace clic
abrir.addEventListener('click', () => {
    // Agrega la clase 'visible' al elemento con id 'nav' cuando se hace clic en 'abrir'
	nav.classList.add('visible');
});

// Agrega un evento de escucha al elemento con id 'cerrar', que se activa cuando se hace clic
cerrar.addEventListener('click', () => {
    // Elimina la clase 'visible' del elemento con id 'nav' cuando se hace clic en 'cerrar'
    nav.classList.remove('visible');
});

/****************PARTE JAVASCRIPT DEL SLIDER********************/

// Selecciona el elemento con la clase 'slider' y encuentra su elemento secundario con la clase 'list'
let list = document.querySelector('.slider .list');

// Selecciona todos los elementos con la clase 'item' que son descendientes del elemento 'list'
let items = document.querySelectorAll('.slider .list .item');

// Selecciona todos los elementos de lista dentro del elemento 'dots' dentro de la clase 'slider'
let dots = document.querySelectorAll('.slider .dots li');

// Selecciona el elemento HTML con el id 'prev'
let prev = document.getElementById('prev');

// Selecciona el elemento HTML con el id 'next'
let next = document.getElementById('next');

// Inicializa el índice activo en 0 y calcula el índice máximo en el array de items
let active = 0;
let lengthItems = items.length - 1;

// Agrega un escuchador de eventos de clic al botón 'next'
next.onclick = function() {
    // Verifica si incrementar el índice activo superaría el último ítem
    if (active + 1 > lengthItems) {
        active = 0; // Si es así, restablece el índice activo a 0
    } else {
        active++; // De lo contrario, incrementa el índice activo
    }

    // Llama a la función para recargar el slider
    reloadSlider();
}

// Agrega un escuchador de eventos de clic al botón 'prev'
prev.onclick = function() {
    // Verifica si decrementar el índice activo iría más allá del primer ítem
    if (active - 1 < 0) {
        active = lengthItems; // Si es así, establece el índice activo en el último ítem
    } else {
        active--; // De lo contrario, decrementa el índice activo
    }

    // Llama a la función para recargar el slider
    reloadSlider();
}

// Configura un intervalo para hacer clic automáticamente en el botón 'next' cada 5000 milisegundos (5 segundos)
let refreshSlider = setInterval(() => { next.click() }, 5000);

// Define una función para recargar el slider
function reloadSlider() {
    // Calcula la posición izquierda del ítem activo en porcentaje relativo al ancho de 'list'
    let checkLeft = items[active].offsetLeft / list.offsetWidth * 100;

    // Establece la propiedad de estilo 'left' de 'list' para mover el slider al ítem activo
    list.style.left = -checkLeft + '%';

    // Encuentra el último punto activo y elimina la clase 'active'
    let lastActiveDot = document.querySelector('.slider .dots li.active');
    lastActiveDot.classList.remove('active');

    // Agrega la clase 'active' al punto correspondiente al nuevo ítem activo
    dots[active].classList.add('active');

    // Borra el intervalo y configúralo de nuevo para reiniciar el movimiento automático del slider
    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => { next.click() }, 5000);
}

// Agrega un escuchador de eventos de clic a cada punto para navegar manualmente al ítem correspondiente
dots.forEach((li, key) => {
    li.addEventListener('click', function() {
        // Establece el índice activo en el índice del punto clickeado
        active = key;

        // Llama a la función para recargar el slider
        reloadSlider();
    });
});

/*****************PARTE JAVA SCRIPT DE LAS NOTICIAS********************************/

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

/*parte de JavaScript con respecto al Carousel de Video*/

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

